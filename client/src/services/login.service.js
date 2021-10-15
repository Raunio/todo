import axios from 'axios';

const API_URL = 'http://localhost:5000/login';

class LoginService {
    static login(account) {
        return axios.post(API_URL, {
            name: account.name,
            password: account.password
        }).then(response => {
            if(response.data.token) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }

            return response.data;
        });
    }

    static logout() {
        localStorage.removeItem('token');
    }
}

export default LoginService;