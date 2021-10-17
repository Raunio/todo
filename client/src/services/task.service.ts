import axios from 'axios';
import config from '../config/config';
import { Task } from '../../../server/src/entity/task';
import authHeader from '../auth/auth.header';

class TaskService {
    static TASK_ENDPOINT = '/task';

    static getTasks = async (token: string) => {
        // TODO: Validation and error handling

        let response = await axios.get(config.SERVICE_URL + this.TASK_ENDPOINT, { headers: authHeader(token) });

        if (response.status === 200) {
            return response.data;
        }

        return '';
    };

    static createOrModifyTask = async (token: string, task: Task) => {
        // TODO: Validation and error handling
        axios.post(config.SERVICE_URL + this.TASK_ENDPOINT, task, { headers: authHeader(token) });
    };

    static deleteTask = async (token: string, task: Task) => {
        // TODO: Validation and error handling
        console.log(task);
        axios.delete(config.SERVICE_URL + this.TASK_ENDPOINT, { data: task, headers: authHeader(token) });
    };
}

export default TaskService;
