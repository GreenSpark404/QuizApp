package org.greenspark404.model;

import lombok.Data;

@Data
public class Question {
    private String questionText;
    private String[] answers;
}
