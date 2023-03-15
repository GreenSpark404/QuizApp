package org.greenspark404.controller;

import lombok.RequiredArgsConstructor;
import org.greenspark404.mapper.QuestionMapper;
import org.greenspark404.model.GameSession;
import org.greenspark404.model.dto.QuestionDTO;
import org.greenspark404.service.GameSessionService;
import org.greenspark404.service.GameSessionStorage;
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
@PreAuthorize("hasAnyRole('GAME_MASTER', 'PLAYER')")
public class GameController {
    private final GameSessionStorage gameSessionStorage;
    private final GameSessionService gameSessionService;
    private final QuestionMapper questionMapper;

    @GetMapping("currentQuestion")
    public QuestionDTO getCurrentQuestion(@PathVariable String sessionId) {
        GameSession session = gameSessionStorage.getSession(sessionId);
        return questionMapper.toDto(gameSessionService.getCurrentQuestion(session));
    }

    @PostMapping("answer/{answerNum}")
    public void registerUserAnswer(@RequestParam Integer answerNum) {

    }
}
