const configDb = require('../../config/database');
const SequelizeHandler = require('./handlers/SequelizeHandler');

module.exports.createConnection = async () => {
    const connection = new SequelizeHandler(configDb);

    try {
        await connection.init();

        await connection.connect();

        global.database = connection;
    } catch (err) {
        console.log(err.message);
        connection.close();
        process.exit(0);
    }
};
