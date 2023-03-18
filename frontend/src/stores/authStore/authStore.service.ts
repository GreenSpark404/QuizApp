import axios from 'axios';

const service = {
    login(user: object) {
        return axios.post(`http://localhost:8080/api/auth/login`, user, {
            withCredentials: true
        })
            .then((response) => response);
    }
}
export default service
