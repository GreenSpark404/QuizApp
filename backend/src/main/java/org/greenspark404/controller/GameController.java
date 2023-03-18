package org.greenspark404.controller;

import lombok.RequiredArgsConstructor;
import org.greenspark404.mapper.QuestionMapper;
import org.greenspark404.model.dto.QuestionDTO;
import org.greenspark404.service.GameSessionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game/{sessionId}")
@PreAuthorize("hasRole('PLAYER')")
public class GameController {
    private final GameSessionService gameSessionService;
    private final QuestionMapper questionMapper;

    @GetMapping("currentQuestion")
    public QuestionDTO getCurrentQuestion(@PathVariable String sessionId) {
        return questionMapper.toPlayerDto(gameSessionService.getCurrentQuestion(sessionId));
    }

    @PostMapping("answer")
    public void registerPlayerAnswer(@PathVariable String sessionId, @RequestParam String answer) {
        gameSessionService.registerAnswer(sessionId, answer);
    }
}
