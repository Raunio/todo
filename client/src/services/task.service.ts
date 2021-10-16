import axios from 'axios';
import config from '../config/config';
import { Task } from '../../../server/src/entity/task';
import authHeader from '../auth/auth.header';

class TaskService {
    static TASK_ENDPOINT = '/task';

    static getTasks = async () => {
        return await axios.get(config.SERVICE_URL + this.TASK_ENDPOINT, { headers: { Authorization: authHeader() } });
    };

    static createOrModifyTask = async (task: Task) => {
        // Client-side validation should be done here

        return axios.post(config.SERVICE_URL + this.TASK_ENDPOINT, { headers: { Authorization: authHeader() } });
    };

    static deleteTask = async (task: Task) => {
        return axios.delete(config.SERVICE_URL + this.TASK_ENDPOINT, { headers: { Authorization: authHeader() } });
    };
}
