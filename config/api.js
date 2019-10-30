require('dotenv');

module.exports = {
    hostname: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '5000'
};
