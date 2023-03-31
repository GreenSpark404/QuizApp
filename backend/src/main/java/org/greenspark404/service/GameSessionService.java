package org.greenspark404.service;

import lombok.RequiredArgsConstructor;
import org.greenspark404.component.GameSessionStorage;
import org.greenspark404.model.domain.GameSession;
import org.greenspark404.model.domain.GameState;
import org.greenspark404.model.domain.Player;
import org.greenspark404.model.entity.Question;
import org.greenspark404.model.entity.Quiz;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;

@Service
@RequiredArgsConstructor
public class GameSessionService {
    private final GameSessionStorage gameSessionStorage;
    private final WebSocketService webSocketService;

    public GameSession startSession(Quiz quiz) {
        GameSession session = gameSessionStorage.startSession(UUID.randomUUID().toString());
        session.setQuizId(quiz.getId());
        session.setQuizName(quiz.getName());
        session.setQuestionsCount(quiz.getQuestionList().size());
        session.setQuestionQueue(new LinkedList<>(quiz.getQuestionList()));
        return session;
    }

    public GameSession getSession(String sessionId) {
        return gameSessionStorage.getSession(sessionId);
    }

    public List<GameSession> getSessionList() {
        return gameSessionStorage.getSessionList();
    }

    public Question getCurrentQuestion(String sessionId) {
        GameSession session = gameSessionStorage.getSession(sessionId);
        return Optional.ofNullable(session.getState()).map(GameState::getQuestion).orElse(null);
    }

    public void registerAnswer(String sessionId, String answer) {
        GameSession session = gameSessionStorage.getSession(sessionId);
        Lock readLock = session.getLock().readLock();
        readLock.lock();
        try {
            GameState state = session.getState();
            if (state.getCompleted().get()) {
                throw new IllegalStateException("Question already completed");
            }
            Player player = Objects.requireNonNull(session.getPlayerMap().get(ejectPlayerId()));
            //noinspection SynchronizationOnLocalVariableOrMethodParameter
            synchronized (player) {
                if (state.getPlayersAnswerMap().containsKey(player)) {
                    throw new IllegalStateException("Player already answered");
                }
                state.getPlayersAnswerMap().put(player, answer);
            }
            boolean isCorrect = Objects.equals(state.getQuestion().getCorrectAnswer(), answer);
            if (isCorrect) {
                int pos = state.getCorrectAnswersCount().getAndIncrement();
                int points = 5 + Math.max((5 - pos), 0);
                session.getScoreboardMap().computeIfPresent(player, (k, v) -> v + points);
            }
            webSocketService.notifyGmSessionUpdated(session);
        } finally {
            readLock.unlock();
        }
    }

    public void nextQuestion(String sessionId) {
        GameSession session = gameSessionStorage.getSession(sessionId);
        Lock writeLock = session.getLock().writeLock();
        writeLock.lock();
        try {
            if (session.getState() != null && !session.getState().getCompleted().get()) {
                throw new IllegalStateException("Previous question doesn't completed");
            }
            Question question = Objects.requireNonNull(session.getQuestionQueue().poll(), "No more questions");
            Integer questionNumber = session.getQuestionsCount() - session.getQuestionQueue().size();
            GameState state = new GameState(question, questionNumber, new ConcurrentHashMap<>());
            session.setState(state);
            // TODO websocket
        } finally {
            writeLock.unlock();
        }
    }

    public GameState endQuestion(String sessionId) {
        GameSession session = gameSessionStorage.getSession(sessionId);
        Lock writeLock = session.getLock().writeLock();
        writeLock.lock();
        try {
            GameState state = session.getState();
            if (state.getCompleted().get()) {
                throw new IllegalStateException("Question already completed");
            }
            session.getPlayersAnswersHistory().add(Collections.unmodifiableMap(state.getPlayersAnswerMap()));
            state.getCompleted().set(true);
            return state;
        } finally {
            writeLock.unlock();
        }
        // TODO websocket
    }

    public void closeSession(String sessionId) {
        gameSessionStorage.closeSession(sessionId);
    }

    @SuppressWarnings("unchecked")
    private String ejectPlayerId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, String> details = (Map<String, String>) authentication.getDetails();
        return details.get("playerId");
    }

}
