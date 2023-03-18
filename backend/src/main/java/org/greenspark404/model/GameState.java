package org.greenspark404.model;

import lombok.Value;
import org.greenspark404.model.entity.Question;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Value
public class GameState {
    Question question;
    Integer questionNumber;
    Map<Player, String> playersAnswerMap;
    AtomicInteger correctAnswersCount = new AtomicInteger();
}
