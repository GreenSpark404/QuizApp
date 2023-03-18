package org.greenspark404.controller;

import lombok.RequiredArgsConstructor;
import org.greenspark404.mapper.GameSessionMapper;
import org.greenspark404.mapper.GameStateMapper;
import org.greenspark404.mapper.QuizMapper;
import org.greenspark404.model.dto.GameSessionDTO;
import org.greenspark404.model.dto.GameStateDTO;
import org.greenspark404.model.dto.QuizDTO;
import org.greenspark404.model.entity.Quiz;
import org.greenspark404.repository.QuizRepository;
import org.greenspark404.service.GameSessionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gm")
@RequiredArgsConstructor
@PreAuthorize("hasRole('GAME_MASTER')")
public class GameMasterController {
    private final QuizRepository quizRepository;
    private final QuizMapper quizMapper;
    private final GameSessionService gameSessionService;
    private final GameSessionMapper gameSessionMapper;
    private final GameStateMapper gameStateMapper;

    @GetMapping("quiz-list")
    public List<QuizDTO> getQuizList() {
        return quizMapper.toDto(quizRepository.findAll());
    }

    @GetMapping("session-list")
    public List<GameSessionDTO> getSessionList() {
        return gameSessionService.getSessionList().stream().map(gameSessionMapper::toIdQuizNameDto).toList();
    }

    @PutMapping("add-quiz")
    public void addQuiz(@RequestBody QuizDTO quiz) {
        quizRepository.save(quizMapper.toEntity(quiz));
    }

    @PostMapping("{quizId}/start-session")
    public String startSession(@PathVariable String quizId) {
        Quiz quiz = quizRepository.findQuizById(quizId).orElseThrow(IllegalArgumentException::new);
        return gameSessionService.startSession(quiz).getId();
    }

    @PostMapping("{sessionId}/next-question")
    public void nextQuestion(@PathVariable String sessionId) {
        gameSessionService.nextQuestion(sessionId);
    }

    @PostMapping("{sessionId}/end-question")
    public GameStateDTO endQuestion(@PathVariable String sessionId) {
        return gameStateMapper.toDto(gameSessionService.endQuestion(sessionId));
    }

    @GetMapping("{sessionId}/session")
    public GameSessionDTO getSessionInfo(@PathVariable String sessionId) {
        return gameSessionMapper.toDto(gameSessionService.getSession(sessionId));
    }

    @PostMapping("{sessionId}/close-session")
    public void closeSession(@PathVariable String sessionId) {
        gameSessionService.closeSession(sessionId);
    }
}
