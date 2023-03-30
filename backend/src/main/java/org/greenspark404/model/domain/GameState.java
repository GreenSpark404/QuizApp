package org.greenspark404.model.domain;

import lombok.Value;
import org.greenspark404.model.entity.Question;

import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

@Value
public class GameState {
    Question question;
    Integer questionNumber;
    Map<Player, String> playersAnswerMap;
    AtomicBoolean completed = new AtomicBoolean();
    AtomicInteger correctAnswersCount = new AtomicInteger();
}
