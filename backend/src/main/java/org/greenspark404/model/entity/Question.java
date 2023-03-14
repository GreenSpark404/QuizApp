package org.greenspark404.model.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class Question {
    private String questionText;
    private List<String> answers;
    private Integer correctAnswer;
}
