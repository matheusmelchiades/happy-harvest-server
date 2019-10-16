const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/mill',
        handler: handler.findAll
    }
];
