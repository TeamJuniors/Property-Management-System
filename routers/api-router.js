'use strict';

const express = require('express');

module.exports = function(app, data) {
    let apiController = require('../controllers/api-controller')(data);
    let condominimumController = require('../controllers/condominimum-controller')(data);
    let apartmentController = require('../controllers/apartment-controller')(data);

    let router = express.Router();

    router.post('/users', apiController.register);
    router.post('/authenticate', apiController.login);
    router.post('/change-image', apiController.changeImage);
    router.post('/getUserByFacebookAuthToken', apiController.getUserByFacebookAuthToken);

    router.get('/condominimum', condominimumController.getAllCondominiums);
    router.post('/condominimum', condominimumController.createCondominium);
    router.get('/findCondominimum', condominimumController.findCondominimumBy);
    router.post('/addApartmentToCondominimum', condominimumController.addApartmentToCondominium);

    router.get('/apartments', apartmentController.getAllApartments);
    router.post('/apartments', apartmentController.createApartment);
    router.post('/findApartments', apartmentController.findApartmentBy);
    router.post('/addUserToApartment', apartmentController.addUserToApartment);

    app.use('/api', router);
};