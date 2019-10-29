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
                    .trim(),
                check('limit').toInt()
            ]
        }
    },
    {
        method: 'GET',
        path: '/mill/listing',
        handler: handler.getListing,
        validations: {
            query: [
                check('page')
                    .not()
                    .isEmpty()
                    .toInt(),
                check('rowsPerPage')
                    .not()
                    .isEmpty()
                    .toInt()
            ]
        }
    }
];
