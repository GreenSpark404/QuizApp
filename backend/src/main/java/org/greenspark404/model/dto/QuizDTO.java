package org.greenspark404.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizDTO {
    private String id;
    private String name;
    private String description;
    private List<QuestionDTO> questionList;
}
