const handler = require('./handler');
const { check } = require('express-validator');

module.exports = [
    {
        method: 'POSt',
        path: '/farm',
        handler: handler.create,
        validations: [
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
];
