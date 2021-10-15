import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVET_PORT || 5000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER,
    jwtSecret: '@QEGTUI'
};

export default config;
