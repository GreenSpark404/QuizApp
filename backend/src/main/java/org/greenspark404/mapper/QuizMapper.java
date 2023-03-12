package org.greenspark404.mapper;

import org.greenspark404.model.dto.QuizDTO;
import org.greenspark404.model.entity.Quiz;
import org.mapstruct.Mapper;

@Mapper
public interface QuizMapper extends EntityMapper<QuizDTO, Quiz> {
}
