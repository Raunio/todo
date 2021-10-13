import http from 'http';
import express from 'express';
import logger from './config/logger';
import config from './config/config';
import healthRoutes from './routes/health';
import 'reflect-metadata';

const NAMESPACE = 'Server';
const router = express();

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
router.use('/', healthRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });

    next();
});

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logger.debug(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
