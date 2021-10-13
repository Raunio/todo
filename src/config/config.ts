import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVET_PORT || 5000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost:42333';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'todo';
const MYSQL_USER = process.env.MYSQL_USER || 'admin';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'admin';

const MYSQL = {
    hostname: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;
