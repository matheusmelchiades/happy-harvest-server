const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/field',
        handler: handler.findAll
    }
];
