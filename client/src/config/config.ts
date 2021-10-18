import axios from 'axios';
import router from '../router/router';

const config = {
    SERVICE_URL: 'http://localhost:5000'
};

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            router.push('/login');
        }
        return error;
    }
);

export default config;
