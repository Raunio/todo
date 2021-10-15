import http from 'http';
import express from 'express';
import 'reflect-metadata';
import * as bcrypt from 'bcryptjs';

import logger from './config/logger';
import config from './config/config';

import healthRoutes from './routes/health';
import taskRoutes from './routes/task';
import loginRoutes from './routes/login';

import { createConnection } from 'typeorm';

import { Account } from './entity/account';

createConnection().then(async (connection) => {
    const NAMESPACE = 'Server';

    /** Seed the db */
    const accountRepository = connection.getRepository(Account);

    let randomString = (Math.random() + 1).toString(36).substring(7);
    let randomString2 = (Math.random() + 1).toString(36).substring(7);

    let account1 = new Account();
    account1.id = 1;
    account1.name = 'niko.tiikkaja';
    account1.password = bcrypt.hashSync(randomString, 8);
    accountRepository.save(account1);

    let account2 = new Account();
    account2.id = 2;
    account2.name = 'matti.mallikas';
    account2.password = bcrypt.hashSync(randomString2, 8);
    accountRepository.save(account2);

    const msg = 'was given randomly generated password';

    logger.debug(NAMESPACE, `${account1.name} ${msg} ${randomString}`);
    logger.debug(NAMESPACE, `${account2.name} ${msg} ${randomString2}`);

    /** Setup express */
    const router = express();
    router.use(express.urlencoded({ extended: false }));
    router.use(express.json());

    /** Log the request */
    router.use((req, res, next) => {
        logger.debug(NAMESPACE, `---> ${req.method} | ${req.url}, | ${req.socket.remoteAddress}`);

        res.on('finish', () => {
            /** Log the response */
            logger.debug(NAMESPACE, `<--- ${req.method} | ${req.url} | ${res.statusCode} | ${req.socket.remoteAddress}`);
        });

        next();
    });

    /** Routes */
    router.use('/health', healthRoutes);
    router.use('/task', taskRoutes);
    router.use('/login', loginRoutes);

    const httpServer = http.createServer(router);
    httpServer.listen(config.server.port, () => logger.debug(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
});
