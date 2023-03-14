import axios from 'axios';

const service = {
    loadUserContent(user: object) {
        return axios.post(`http://localhost:8080/api/auth/login`, user, {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
        })
            .then((response) => response);
    }
}
export default service
