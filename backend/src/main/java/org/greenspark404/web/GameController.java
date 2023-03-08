package org.greenspark404.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @GetMapping("currentQuestion")
    public void getCurrentQuestion() {

    }

    @PostMapping("answer/{answerNum}")
    public void registerUserAnswer(@RequestParam Integer answerNum) {

    }
}
