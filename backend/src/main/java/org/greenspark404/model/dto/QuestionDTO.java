package org.greenspark404.model.dto;

import lombok.Data;

@Data
public class QuestionDTO {
    private String questionText;
    private String correctAnswer;
    private String[] answers;
}
