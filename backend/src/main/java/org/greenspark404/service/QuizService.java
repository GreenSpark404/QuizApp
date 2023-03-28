package org.greenspark404.service;

import lombok.RequiredArgsConstructor;
import org.greenspark404.model.entity.Quiz;
import org.greenspark404.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;

    public Quiz getById(String id) {
        return quizRepository.findQuizById(id).orElseThrow(IllegalArgumentException::new);
    }

    public List<Quiz> getQuizList() {
        return quizRepository.findAll();
    }

    public void save(Quiz quiz) {
        quizRepository.save(quiz);
    }

    public void delete(String quizId) {
        quizRepository.deleteById(quizId);
    }
}
