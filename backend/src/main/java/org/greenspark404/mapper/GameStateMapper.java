package org.greenspark404.mapper;

import org.greenspark404.model.domain.GameState;
import org.greenspark404.model.dto.GameStateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = QuestionMapper.class)
public interface GameStateMapper {
    @Mapping(target = "answersCount", expression = "java(gameState.getPlayersAnswerMap().size())")
    @Mapping(target = "correctAnswersCount", expression = "java(gameState.getCorrectAnswersCount().get())")
    @Mapping(target = "completed", expression = "java(gameState.getCompleted().get())")
    GameStateDTO toDto(GameState gameState);
}
