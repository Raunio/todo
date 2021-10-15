import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Account } from '../entity/account';
import config from '../config/config';

class LoginController {
    static login = async (req: Request, res: Response) => {
        if (!req.body) {
            return res.status(400).send();
        }
        //Check if username and password are set
        let { name, password } = req.body;
        if (!(name && password)) {
            return res.status(400).send();
        }

        //Get user from database
        const accountRepository = getRepository(Account);
        let account: Account = await accountRepository.findOneOrFail({ where: { name } });

        if (!bcrypt.compareSync(password, account.password)) {
            return res.status(401).send();
        }
        // Sing JWT, valid for 1 hour
        const token = jwt.sign({ accountId: account.id, accountName: account.name }, config.jwtSecret, { expiresIn: '1h' });

        // Send the jwt in the response
        return res.send(token);
    };
}
export default LoginController;
