import http from 'http';
import express from 'express';
import 'reflect-metadata';
import * as bcrypt from 'bcryptjs';
import cors from 'cors';

import logger from './config/logger';
import config from './config/config';

import healthRoutes from './routes/health';
import taskRoutes from './routes/task';
import loginRoutes from './routes/login';

import { createConnection } from 'typeorm';

import { Account } from './entity/account';

createConnection().then(async (connection) => {
    const NAMESPACE = 'Server';

    /** Seed the db.
     * TODO: This should not be a part of application code
     */
    const accountRepository = connection.getRepository(Account);

    let randomString = (Math.random() + 1).toString(36).substring(7);
    let randomString2 = (Math.random() + 1).toString(36).substring(7);

    let account1 = new Account();
    account1.id = 1;
    account1.name = 'maija.mallikas';
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

    const allowedOrigins = ['http://localhost:3000'];
    const options: cors.CorsOptions = {
        origin: allowedOrigins
    };

    router.use(cors(options));
    router.use(express.urlencoded({ extended: false }));
    router.use(express.json());
    /**
     * Application code was not compatible with etag based caching ([ERR_HTTP_HEADERS_SENT])
     * So instead of refactoring the code or implementing a 'proper' caching system, I decided
     * to just disable etag
     */
    router.disable('etag');

    /** Log requests */
    router.use((req, res, next) => {
        logger.debug(NAMESPACE, `---> ${req.method} |${req.url}, | ${req.socket.remoteAddress}`);

        res.on('finish', () => {
            /** Log responses */
            logger.debug(NAMESPACE, `<--- ${req.method} | ${req.url} | ${res.statusCode} | ${req.socket.remoteAddress}`);
        });

        next();
    });

    /** Routes */
    router.use('/health', healthRoutes);
    router.use('/task', taskRoutes);
    router.use('/login', loginRoutes);

    router.listen(config.server.port, () => {
        logger.debug(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`);
    });
});
