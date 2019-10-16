const express = require('express');
const config = require('../config/api');
const routes = require('./routes');
const middlewares = require('./middlewares');
const database = require('./database/dbfactory');
const logger = require('./logger')();
const app = express();

middlewares.load(app);
routes.load(app);

exports.app = app;

exports.run = async () => {
    await database.createConnection();

    app.listen(config.port, () => {
        logger.info('🌎 SERVER RUNNING');
        logger.info(`http://${config.hostname}:${config.port}`);
    });
};
