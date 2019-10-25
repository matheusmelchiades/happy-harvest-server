const { check } = require('express-validator');
const handler = require('./handler');

module.exports = [
    {
        method: 'POST',
        path: '/mill',
        handler: handler.create,
        validations: {
            body: [
                check('name')
                    .isString()
                    .trim()
                    .not()
                    .isEmpty()
            ]
        }
    },
    {
        method: 'GET',
        path: '/mill',
        handler: handler.search,
        validations: {
            query: [
                check('search')
                    .isString()
                    .trim()
            ]
        }
    }
];
