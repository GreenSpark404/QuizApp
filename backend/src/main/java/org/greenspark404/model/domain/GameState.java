package org.greenspark404.model.domain;

import lombok.Value;
import org.greenspark404.model.OneWayTrigger;
import org.greenspark404.model.entity.Question;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Value
public class GameState {
    Question question;
    Integer questionNumber;
    Map<Player, String> playersAnswerMap;
    OneWayTrigger completed = new OneWayTrigger();
    AtomicInteger correctAnswersCount = new AtomicInteger();
}
