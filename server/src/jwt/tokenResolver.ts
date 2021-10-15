import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { Account } from '../entity/account';

export const resolveToken = (req: Request, res: Response, next: NextFunction) => {
    // Read token from header
    let token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).send();
    }

    jwt.verify(token, config.server.token.secret, (error, decoded) => {
        if(error) {
            return res.status(401).send();
        }

        res.locals.jwt = decoded;
    });
    

    next();
};
