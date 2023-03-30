package org.greenspark404.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
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
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Service
@RequiredArgsConstructor
public class GameSessionService {
    private final GameSessionStorage gameSessionStorage;
    private final ReentrantLock lock = new ReentrantLock();

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
        Player player = Objects.requireNonNull(session.getPlayerMap().get(ejectPlayerId()));
        GameState state = session.getState();
        if (state != null && lock.getHoldCount() == 0) {
            state.getPlayersAnswerMap().put(player, answer);
            boolean isCorrect = Objects.equals(state.getQuestion().getCorrectAnswer(), answer);
            if (isCorrect) {
                int pos = state.getCorrectAnswersCount().getAndIncrement();
                int points = 5 + Math.max((5 - pos), 0);
                session.getScoreboardMap().computeIfPresent(player, (k, v) -> v + points);
            }
        }
    }

    public void nextQuestion(String sessionId) {
        doWithLock(() -> {
            GameSession session = gameSessionStorage.getSession(sessionId);
            if (session.getState() != null && !session.getState().getCompleted().get()) {
                throw new IllegalStateException("Previous question doesn't completed");
            }
            Question question = session.getQuestionQueue().poll();
            Integer questionNumber = session.getQuestionsCount() - session.getQuestionQueue().size();
            GameState state = new GameState(question, questionNumber, new ConcurrentHashMap<>());
            session.setState(state);
            return null;
            // TODO websocket
        });
    }

    public GameState endQuestion(String sessionId) {
        return doWithLock(() -> {
            GameSession session = gameSessionStorage.getSession(sessionId);
            GameState state = session.getState();
            session.getPlayersAnswersHistory().add(Collections.unmodifiableMap(state.getPlayersAnswerMap()));
            state.getCompleted().pull();
            return state;
            // TODO websocket
        });
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

    @SneakyThrows
    private <T> T doWithLock(Callable<T> action) {
        if (lock.tryLock()) {
            try {
                return action.call();
            } finally {
                lock.unlock();
            }
        } else {
            throw new IllegalStateException("Method was invoked at illegal moment");
        }
    }

}
