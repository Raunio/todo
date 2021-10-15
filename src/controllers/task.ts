import { Request, Response, NextFunction, response } from 'express';
import { getRepository } from 'typeorm';
import { idText } from 'typescript';
import logger from '../config/logger';

import { Task } from '../entity/task';

const NAMESPACE = 'TaskController';

class TaskController {
    static parseErrorMessage: string = 'Error while trying to parse task from request body';

    static getTasks = async (req: Request, res: Response) => {
        const repository = getRepository(Task);
        const accountId = res.locals.jwtPayload.accountId;
        let tasks = await repository.find({ where: { account_id: accountId } });
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

        if (task.id) {
            task.id;
        }

        const repository = getRepository(Task);
        const accountId = res.locals.jwtPayload.accountId;
        task.account_id = accountId;

        await repository.save(task);
        return res.status(200).json(task).send();
    };

    static deleteTask = async (req: Request, res: Response) => {
        if (!req.body) {
            return res.status(400).send();
        }

        let taskId = req.body.id;
        const repository = getRepository(Task);
        const accountId = res.locals.jwtPayload.accountId;

        await repository.delete({ id: taskId, account_id: accountId });
        return res.status(200).send();
    };
}

export default TaskController;
