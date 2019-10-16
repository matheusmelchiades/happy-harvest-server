process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const database = require('./database/dbfactory');
const config = require('../config/api');
const routes = require('./routes');
const middlewares = require('./middlewares');
const logger = require('./logger')();
const app = express();

function loaders() {
    middlewares.load(app);
    routes.load(app);
}

exports.initalize = () => {
    loaders();

    return app;
};

exports.run = async () => {
    try {
        await database.createConnection();

        logger.info('#### INIT LOAD MIDDLEWARES ####');

        await loaders();

        logger.info('#### FINALIZED LOAD MIDDLEWARES ####');

        await app.listen(config.port);

        logger.info('🌎 SERVER RUNNING');
        logger.info(`http://${config.hostname}:${config.port}`);
    } catch (err) {
        logger.error(` : : ${err.message} : :`);

        process.exit(0);
    }
};
