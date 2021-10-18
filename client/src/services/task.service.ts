import axios from 'axios';
import config from '../config/config';
import { Task } from '../../../server/src/entity/task';
import authHeader from '../auth/auth.header';

class TaskService {
    static TASK_ENDPOINT = '/task';

    static getTasks = async (filter: string) => {
        // TODO: Validation and error handling

        let response = await axios.get(`${config.SERVICE_URL}${this.TASK_ENDPOINT}?filter=${filter}`, { headers: authHeader() });

        if (response.status === 200) {
            return response.data;
        }

        return '';
    };

    static createOrModifyTask = async (task: Task) => {
        // TODO: Validation and error handling
        let response = await axios.post(config.SERVICE_URL + this.TASK_ENDPOINT, task, { headers: authHeader() });

        if (response.status === 200) {
            return response.data;
        }

        return '';
    };

    static deleteTask = async (task: Task) => {
        // TODO: Validation and error handling
        axios.delete(config.SERVICE_URL + this.TASK_ENDPOINT, { data: task, headers: authHeader() });
    };
}

export default TaskService;
