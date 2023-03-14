package org.greenspark404.controller;

import lombok.RequiredArgsConstructor;
import org.greenspark404.mapper.QuizMapper;
import org.greenspark404.model.GameSession;
import org.greenspark404.model.dto.QuizDTO;
import org.greenspark404.model.entity.Quiz;
import org.greenspark404.repository.QuizRepository;
import org.greenspark404.service.GameSessionStorage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@RestController
@RequestMapping("/api/gm")
@RequiredArgsConstructor
@PreAuthorize("hasRole('GAME_MASTER')")
public class GameMasterController {
    private final QuizRepository quizRepository;
    private final QuizMapper quizMapper;
    private final GameSessionStorage gameSessionStorage;

    @GetMapping("quiz-list")
    public List<QuizDTO> getQuizList() {
        return quizMapper.toDto(quizRepository.findAll());
    }

    @PostMapping("{quizId}/start-session")
    public String startSession(@PathVariable String quizId) {
        Quiz quiz = quizRepository.findQuizById(quizId).orElseThrow(IllegalArgumentException::new);
        GameSession session = gameSessionStorage.startSession(UUID.randomUUID().toString());
        session.setQuestions(new ArrayList<>(quiz.getQuestionList()));
        return session.getId();
    }

    @PostMapping("{sessionId}/next-question")
    public void nextQuestion(@PathVariable String sessionId) {


    }

    @PostMapping("{sessionId}/close-session")
    public void closeSession(@PathVariable String sessionId) {
        gameSessionStorage.closeSession(sessionId);
    }
}
