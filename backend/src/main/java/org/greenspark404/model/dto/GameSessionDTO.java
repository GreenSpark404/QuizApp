package org.greenspark404.model.dto;

import lombok.Data;

import java.util.Map;

@Data
public class GameSessionDTO {
    private String quizId;
    private GameStateDTO state;
    private Integer totalPlayers;
    private Map<PlayerDTO, Integer> scoreboardMap;
}
