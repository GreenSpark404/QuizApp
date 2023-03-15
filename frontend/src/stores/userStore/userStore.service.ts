import axios from 'axios';

const service = {
    loadUserContent(user: object) {
        //axios.defaults.withCredentials = true;
        return axios.post(`http://localhost:8080/api/auth/login`, user, {
            withCredentials: true
        })
            .then((response) => response);
    }
}
export default service
