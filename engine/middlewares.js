const express = require('express');
const cors = require('cors');
const loggerHttp = require('morgan');

exports.load = app => {
    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(loggerHttp('dev'));
};
