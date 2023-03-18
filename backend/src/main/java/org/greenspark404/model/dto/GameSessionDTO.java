package org.greenspark404.model.dto;

import lombok.Data;

import java.util.Map;

@Data
public class GameSessionDTO {
    private String id;
    private String quizName;
    private GameStateDTO state;
    private Integer questionsCount;
    private Integer totalPlayers;
    private Map<PlayerDTO, Integer> scoreboardMap;
}
