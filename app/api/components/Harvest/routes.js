const handler = require('./handler');
const { check } = require('express-validator');

module.exports = [
    {
        method: 'POST',
        path: '/harvest',
        handler: handler.create,
        validations: {
            body: [
                check('startDate')
                    .not()
                    .isEmpty()
                    .isISO8601()
                    .trim(),

                check('endDate')
                    .isISO8601()
                    .trim(),

                check('millId')
                    .isInt()
                    .not()
                    .isEmpty()
            ]
        }
    }
];
