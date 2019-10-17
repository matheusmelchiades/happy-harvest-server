const handler = require('./handler');

module.exports = [
    {
        method: 'POST',
        path: '/mill',
        handler: handler.create
    }
];
