import axios from 'axios';

const service = {
    loadUserContent(user: object) {
        return axios.post(`http://localhost:8080/api/auth/login`, user)
            .then((response) => response.data);
    }
}
export default service