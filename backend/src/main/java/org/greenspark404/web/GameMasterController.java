package org.greenspark404.web;

import org.greenspark404.model.dto.QuizDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/gm")
public class GameMasterController {

    @GetMapping("quiz-list")
    public List<QuizDTO> getQuizList() {
        return Collections.emptyList();
    }

    @PostMapping("start-session/{quizId}")
    public void startSession(@RequestParam String quizId) {

    }

    @PostMapping("close-session/{sessionId}")
    public void closeSession(@RequestParam String sessionId) {

    }
}
