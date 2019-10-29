const handler = require('./handler');
const { check } = require('express-validator');

module.exports = [
    {
        method: 'POST',
        path: '/farm',
        handler: handler.create,
        validations: {
            body: [
                check('name')
                    .isString()
                    .trim()
                    .not()
                    .isEmpty(),
                check('harvestId')
                    .isInt()
                    .not()
                    .isEmpty()
            ]
        }
    },
    {
        method: 'GET',
        path: '/farm/listing',
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
