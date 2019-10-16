require('dotenv');

module.exports = {
    hostname: process.env.HOST || 'localhost',
    port: process.env.PORT || '5000'
};
