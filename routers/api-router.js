'use strict';

const express = require('express');

module.exports = function(app, data) {
    let apiController = require('../controllers/api-controller')(data);

    let router = express.Router();

    router.post('/users', apiController.register);
    router.post('/authenticate', apiController.login);
    router.post('/change-image', apiController.changeImage);

    app.use('/api', router);
};