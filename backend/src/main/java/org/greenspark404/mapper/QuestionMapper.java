package org.greenspark404.mapper;

import org.greenspark404.model.dto.QuestionDTO;
import org.greenspark404.model.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {
    @DoIgnore
    @Mapping(target = "correctAnswer", ignore = true)
    QuestionDTO toPlayerDto(Question question);

}
