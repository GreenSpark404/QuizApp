package org.greenspark404.model.domain;

import lombok.Data;
import org.greenspark404.model.entity.Question;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

@Data
public class GameSession {
    private final String id;
    private final Instant startTimestamp = Instant.now();
    private final Map<String, Player> playerMap = new ConcurrentHashMap<>();
    private final Map<Player, Integer> scoreboardMap = new ConcurrentHashMap<>();
    private final List<Map<Player, String>> playersAnswersHistory = new ArrayList<>();

    private String quizId;
    private String quizName;
    private Integer questionsCount;
    private Queue<Question> questionQueue;
    private GameState state;
}
