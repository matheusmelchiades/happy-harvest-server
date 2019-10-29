const handler = require('./handler');
const { check } = require('express-validator');

module.exports = [
    {
        method: 'POST',
        path: '/field',
        handler: handler.create,
        validations: {
            body: [
                check('latitude')
                    .isFloat()
                    .not()
                    .isEmpty(),
                check('longitude')
                    .isFloat()
                    .not()
                    .isEmpty(),
                check('farmId')
                    .isInt()
                    .not()
                    .isEmpty()
            ]
        }
    },
    {
        method: 'GET',
        path: '/field/listing',
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
