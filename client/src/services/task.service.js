import axios from 'axios';
import authHeader from '../auth/auth.header';

const API_URL = 'http://localhost:5000/task';

class TaskService {
    static getTasks() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    static createOrModify(task) {
        return axios.post(API_URL, { headers: authHeader(), body: task });
    }

    static delete(task) {
        return axios.delete(API_URL, { headers: authHeader(), body: task });
    }
}

export default TaskService;