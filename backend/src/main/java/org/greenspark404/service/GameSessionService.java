package org.greenspark404.service;

import org.greenspark404.model.GameSession;
import org.greenspark404.model.entity.Question;
import org.springframework.stereotype.Service;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class GameSessionService {
    private final Lock lock = new ReentrantLock();

    public Question getCurrentQuestion(GameSession session) {
        return session.getQuestions().get(session.getCurrentQuestionIndex());
    }

    public void nextQuestion(GameSession session) {
        if (lock.tryLock()) {
            try {


            } finally {
                lock.unlock();
            }
        }
    }

}
