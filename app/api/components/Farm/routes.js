const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/farm',
        handler: handler.findAll
    }
];
