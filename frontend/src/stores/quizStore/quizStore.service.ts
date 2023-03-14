import axios from 'axios';

const service = {
    loadQuizList() {
        return axios.get(`http://localhost:8080/api/gm/quiz-list`)
            .then((response) => response.data);
    }
}
export default service
