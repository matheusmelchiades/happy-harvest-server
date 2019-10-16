require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

global.database = {};

module.exports = {
    host: process.env.DB_HOSTNAME || 'localhost',
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db',
    dialect: process.env.DB_DIALECT || 'postgres',
    storage: `${process.cwd()}/__tests__/database.sqlite`,
    logging: process.env.NODE_ENV === 'development',
    define: {
        timestamps: false,
        underscored: false,
        underscoredAll: false
    }
};
