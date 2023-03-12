package org.greenspark404.model;

import lombok.Data;
import org.greenspark404.model.entity.Question;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

@Data
public class GameSession {
    private final String id;
    private Queue<Question> questions;
    private final Map<String, Player> playerMap = new ConcurrentHashMap<>();
    private final List<Map<Player, String>> playerAnswers = new LinkedList<>();
    private final Map<Player, Integer> scoreboardMap = new ConcurrentHashMap<>();
}
