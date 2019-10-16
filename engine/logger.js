const fs = require('fs');
const bunyan = require('bunyan');

const config = require('../config/logger');

let rotatingLogger = null;

module.exports = () => {
    console.log('CHAMo');
    const { options } = config.core_logging;

    // create log folder
    if (options.createFile && !fs.existsSync(config.core_logging.folder)) fs.mkdirSync(config.core_logging.folder);

    if (!rotatingLogger) rotatingLogger = bunyan.createLogger({ ...config.core_logging.options });

    return rotatingLogger;
};
