const bunyan = require('bunyan');

const LOG_FOLDER = './logs';

const noTest = process.env.NODE_ENV !== 'test';
const noDevelopment = process.env.NODE_ENV !== 'development';

module.exports = {
    // logging settings
    core_logging: {
        // destination folder
        folder: `${LOG_FOLDER}`,

        // bunyan options
        options: {
            // log reference
            name: 'core',

            serializers: bunyan.stdSerializers,

            // output streams
            streams: [
                noTest
                    ? {
                          stream: process.stdout,
                          level: 'debug'
                      }
                    : undefined,
                // file output
                noTest && noDevelopment
                    ? {
                          type: 'rotating-file',
                          period: '1d',
                          count: 365,
                          path: `${LOG_FOLDER}/api.${process.pid}.log`,
                          level: bunyan.DEBUG
                      }
                    : undefined
            ].filter(log => !!log),
            createFile: noTest && noDevelopment
        }
    }
};
