package org.greenspark404.model;

import lombok.Data;

import java.util.List;

@Data
public class GameSession {
    private final String id;
    private List<Question> questions;
}
