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
    },
    {
        method: 'GET',
        path: '/harvest/listing',
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
    },
    {
        method: 'GET',
        path: '/mill/:millId/harvest',
        handler: handler.getHarvestByMillId,
        validations: {
            params: [
                check('millId')
                    .not()
                    .isEmpty()
                    .toInt()
            ]
        }
    },
    {
        method: 'GET',
        path: '/harvest/date',
        handler: handler.getHarvestsByDate,
        validations: {
            query: [
                check('startDate')
                    .not()
                    .isEmpty()
                    .isString()
                    .isISO8601()
                    .toDate(),
                check('endDate')
                    .not()
                    .isEmpty()
                    .isString()
                    .isISO8601()
                    .toDate()
            ]
        }
    }
];
