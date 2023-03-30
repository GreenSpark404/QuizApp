import axios from 'axios';
import { QuizFullItem } from './quizStore.model';

const service = {
    loadQuizList() {
        return axios.get(`http://localhost:8080/api/gm/quiz-list`, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    loadSessionList() {
        return axios.get(`http://localhost:8080/api/gm/session-list`, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    startSession(quizId: string) {
        return axios.post(`http://localhost:8080/api/gm/${quizId}/start-session`, null, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    startNextQuestion(sessionId: string) {
        return axios.post(`http://localhost:8080/api/gm/${sessionId}/next-question`, null, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    endQuestion(sessionId: string) {
        return axios.post(`http://localhost:8080/api/gm/${sessionId}/end-question`, null, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    destroySession(sessionId: string) {
        return axios.post(`http://localhost:8080/api/gm/${sessionId}/close-session`, null, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    regPlayer(sessionId: string, player: object) {
        return axios.post(`http://localhost:8080/api/auth/${sessionId}/register`, player)
            .then((response) => response.data);
    },

    addQuiz(quiz: QuizFullItem) {
        return axios.put(`http://localhost:8080/api/gm/add-quiz`, quiz, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    deleteQuiz(quizId: string) {
        return axios.delete(`http://localhost:8080/api/gm/${quizId}/remove`, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    getCurrentSession(sessionId: string) {
        return axios.get(`http://localhost:8080/api/gm/${sessionId}/session`, {
            withCredentials: true
        })
            .then((response) => response.data);
    },
}
export default service
