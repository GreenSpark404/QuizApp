package org.greenspark404.model;

import lombok.Data;
import org.greenspark404.model.entity.Question;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Data
public class GameState {
    private final Question question;
    private final Map<Player, Integer> playersAnswerMap;
    private final AtomicInteger correctAnswersCount = new AtomicInteger();
}
