package org.greenspark404.mapper;

import org.greenspark404.model.domain.GameSession;
import org.greenspark404.model.dto.GameSessionDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = GameStateMapper.class)
public interface GameSessionMapper {
    @Mapping(target = "totalPlayers", expression = "java(session.getPlayerMap().size())")
    GameSessionDTO toDto(GameSession session);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "quizName", source = "quizName")
    GameSessionDTO toIdQuizNameDto(GameSession session);
}
