package org.greenspark404.model.dto;

import lombok.Data;

@Data
public class GameStateDTO {
    private QuestionDTO question;
    private Integer questionNumber;
    private Integer answersCount;
    private Integer correctAnswersCount;
    private Boolean completed;
}
