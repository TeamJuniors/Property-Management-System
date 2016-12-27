'use strict';

const express = require('express');

module.exports = function(app, data) {
    let apiController = require('../controllers/api-controller')(data);

    let router = express.Router();

    router.post('/users', apiController.register);
    router.post('/authenticate', apiController.login);

    app.use('/api', router);
};