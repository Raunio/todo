import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVET_PORT || 5000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const JWT_SECRET = '@QEGTUI';
const JWT_ISSUER = 'todo-issuer';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        secret: JWT_SECRET,
        issuer: JWT_ISSUER
    }
};

const config = {
    server: SERVER,
};

export default config;
