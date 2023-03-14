package org.greenspark404.mapper;

import org.greenspark404.model.dto.QuestionDTO;
import org.greenspark404.model.entity.Question;
import org.mapstruct.Mapper;

@Mapper
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {
}
