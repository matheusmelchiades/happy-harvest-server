require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? `${process.cwd()}/.env.test` : `${process.cwd()}/.env`
});

global.database = {};

module.exports = {
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || 'postgres',
    storage: `${process.cwd()}/__tests__/database.sqlite`,
    logging: process.env.NODE_ENV === 'development',
    define: {
        timestamps: false,
        underscored: false,
        underscoredAll: false,
    }
};
