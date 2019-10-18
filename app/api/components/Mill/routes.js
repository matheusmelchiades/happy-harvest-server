const { check } = require('express-validator');
const handler = require('./handler');

module.exports = [
    {
        method: 'POST',
        path: '/mill',
        handler: handler.create,
        validations: [
            check('name')
                .isString()
                .trim()
                .not()
                .isEmpty()
        ]
    }
];
