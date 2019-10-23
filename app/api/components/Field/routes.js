const handler = require('./handler');
const { check } = require('express-validator');

module.exports = [
    {
        method: 'POST',
        path: '/field',
        handler: handler.create,
        validations: [
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
];
