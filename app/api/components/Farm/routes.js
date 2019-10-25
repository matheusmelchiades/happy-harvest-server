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
    }
];
