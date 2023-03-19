import axios from 'axios';

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

    destroySession(sessionId: string) {
        return axios.post(`http://localhost:8080/api/gm/${sessionId}/close-session`, null, {
            withCredentials: true
        })
            .then((response) => response.data);
    },

    regPlayer(sessionId: string, player: object) {
        return axios.post(`http://localhost:8080/api/auth/${sessionId}/register`, player)
            .then((response) => response.data);
    }
}
export default service
