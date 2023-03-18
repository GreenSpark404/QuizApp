package org.greenspark404.mapper;

import org.greenspark404.model.dto.QuizDTO;
import org.greenspark404.model.entity.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface QuizMapper extends EntityMapper<QuizDTO, Quiz> {
    @Override
    @Mapping(target = "questionList", ignore = true)
    QuizDTO toDto(Quiz entity);
}
