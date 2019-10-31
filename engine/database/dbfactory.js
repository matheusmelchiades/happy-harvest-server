const configDb = require('../../config/database');
const SequelizeHandler = require('./handlers/SequelizeHandler');
const logger = require('../logger')();

module.exports.createConnection = async () => {
    const connection = new SequelizeHandler(configDb);

    try {
        logger.info(`Configurate with sucess: ${configDb.database} type: ${configDb.dialect}`);

        await connection.init();

        logger.info(`Connecting into: ${configDb.database} type: ${configDb.dialect}`);

        await connection.connect();

        logger.info(`Connected success on: ${configDb.database} type: ${configDb.dialect}`);

        global.database = connection;
    } catch (err) {
        logger.error(err.message);
        connection.close();
        process.exit(0);
    }
};
