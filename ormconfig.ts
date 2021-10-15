module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASS || 'pass',
    database: process.env.DB_NAME || 'todo',
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity'
    }
};
