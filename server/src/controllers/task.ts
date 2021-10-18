import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import logger from '../config/logger';
import { Task } from '../entity/task';

const NAMESPACE = 'TaskController';

class TaskController {
    static parseErrorMessage: string = 'Error while trying to parse task from request body';

    static getTasks = async (req: Request, res: Response) => {
        const repository = getRepository(Task);
        const accountId = res.locals.jwt.accountId; // TODO: validate

        let tasks: Task[];
        if (req.query.filter && req.query.filter !== 'all') {
            let filterValue = req.query.filter === 'completed' ? true : false;
            tasks = await repository.find({ where: { account_id: accountId, is_done: filterValue } });
        } else {
            tasks = await repository.find({ where: { account_id: accountId } });
        }

        /** Results from db seemed to be ordered by time of modification,
         * so we sort the result by id which is basically the same thing as sorting by time of creation */
        tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
        return res.status(200).json(tasks).send();
    };

    static createOrModifyTask = async (req: Request, res: Response) => {
        if (!req.body) {
            return res.status(400).send();
        }

        let task: Task;

        try {
            task = req.body;
        } catch (e) {
            logger.debug(NAMESPACE, `${this.parseErrorMessage} ${req.body}`, e);
            return res.status(400).send();
        }

        if (!task.task_description) {
            return res.status(400).send();
        }

        const repository = getRepository(Task);
        const accountId = res.locals.jwt.accountId;
        task.account_id = accountId;

        try {
            await repository.save(task);
        } catch (e) {
            logger.debug(NAMESPACE, 'Error while trying to save task', e);
            return res.status(500).send();
        }

        return res.status(200).json(task).send();
    };

    static deleteTask = async (req: Request, res: Response) => {
        if (!req.body) {
            return res.status(400).send();
        }

        let taskId = req.body.id;
        const repository = getRepository(Task);
        const accountId = res.locals.jwt.accountId;

        try {
            await repository.delete({ id: taskId, account_id: accountId });
        } catch (e) {
            logger.debug(NAMESPACE, 'Error while trying to delete task', e);
            return res.status(500).send();
        }

        return res.status(200).send();
    };
}

export default TaskController;
