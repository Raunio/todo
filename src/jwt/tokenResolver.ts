import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const resolveToken = (req: Request, res: Response, next: NextFunction) => {
    // Read token from header
    const token = <string>req.header('Authorization');
    let jwtPayload;

    // Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        // If the token could not be validated, respond with 401
        res.status(401).send();
        return;
    }

    next();
};
