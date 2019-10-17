const express = require('express');
const cors = require('cors');
const boom = require('express-boom');
const loggerHttp = require('morgan');

exports.load = app => {
    if (process.env.NODE_ENV !== 'test') {
        app.use(loggerHttp('dev'));
    }

    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(boom());
};
