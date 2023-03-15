package org.greenspark404.model;

import lombok.Data;
import org.greenspark404.model.entity.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

@Data
public class GameSession {
    private final String id;
    private String quizId;
    private Queue<Question> questionQueue;
    private GameState state;

    private final Map<String, Player> playerMap = new ConcurrentHashMap<>();
    private final Map<Player, Integer> scoreboardMap = new ConcurrentHashMap<>();
    private final List<Map<Player, Integer>> playersAnswersHistory = new ArrayList<>();
}
