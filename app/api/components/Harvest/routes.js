const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/harvest',
        handler: handler.findAll
    }
];
