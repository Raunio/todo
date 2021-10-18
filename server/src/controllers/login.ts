import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Account } from '../entity/account';
import config from '../config/config';
import logger from '../config/logger';

class LoginController {
    static NAMESPACE: string = 'LOGIN';

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
        let account: Account;

        try {
            account = await accountRepository.findOneOrFail({ where: { name } });
        } catch (e) {
            logger.debug(this.NAMESPACE, `Could not find account with name ${name}`, e);
            return res.status(404).send();
        }

        if (!bcrypt.compareSync(password, account.password)) {
            return res.status(401).json('Invalid password').send();
        }

        jwt.sign({ accountId: account.id }, config.server.token.secret, { issuer: config.server.token.issuer, algorithm: 'HS256', expiresIn: '1h' }, (error, token) => {
            if (error || !token) {
                return res.status(500).send();
            }

            return res.status(200).json({ user: account.name, token }).send();
        });
    };
}
export default LoginController;
