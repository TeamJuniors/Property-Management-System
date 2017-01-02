'use strict';
const express = require('express');
const path = require('path');

function getMainPage(req, res) {
    res.sendFile(path.resolve('public/index.html'));
}

//If you create new route on the cient then add it there.
module.exports = function (app, data) {
    let feedbackController = require('../controllers/feedback-controller')(data);

    let router = express.Router();

    app.get('/', getMainPage);
    app.get('/home', getMainPage);
    app.get('/login/facebook', getMainPage);
    app.get('/login', getMainPage);
    app.get('/register', getMainPage);
    app.get('/manager', getMainPage);
    app.get('*', getMainPage);
    app.post('/receive', feedbackController.getFeedback);
    app.post('/feedback', feedbackController.sendFeedback);
};