'use strict';

const express = require('express');

module.exports = function(app, data) {
    let apiController = require('../controllers/api-controller')(data);
    let condominimumController = require('../controllers/condominimum-controller')(data);
    let apartmentController = require('../controllers/apartment-controller')(data);
    let protocolController = require('../controllers/protocols-controller')(data);
    let managerUnionController = require('../controllers/managerUnion-controller')(data);
    let controlUnionController = require('../controllers/controlUnion-controller')(data);
    let townshipMessageController = require('../controllers/townshipMessage-controller')(data);

    let router = express.Router();

    router.post('/users', apiController.register);
    router.post('/authenticate', apiController.login);
    router.post('/change-image', apiController.changeImage);
    router.post('/getUserByFacebookAuthToken', apiController.getUserByFacebookAuthToken);
    router.post('/addTask', apiController.addTask);

    router.get('/condominimums', condominimumController.getAllCondominiums);
    router.post('/condominimums', condominimumController.createCondominium);
    router.post('/findCondominimums', condominimumController.findCondominimumBy);
    router.post('/addApartmentToCondominimum', condominimumController.addApartmentToCondominium);
    router.post('/addUserToApartmentInCondominium', condominimumController.AddUserToApartmentInCondominium);

    router.get('/apartments', apartmentController.getAllApartments);
    router.post('/apartments', apartmentController.createApartment);
    router.post('/findApartments', apartmentController.findApartmentBy);
    router.post('/addUserToApartment', apartmentController.addUserToApartment);

    router.get('/protocols', protocolController.getAllProtocols);
    router.post('/protocols', protocolController.createProtocol);
    router.post('/findProtocol', protocolController.findProtocolBy);

    router.get('/managerUnions', managerUnionController.getAllManagerUnions);
    router.post('/managerUnions', managerUnionController.createManagerUnion);
    router.post('/findManagerUnion', managerUnionController.findManagerUnionBy);
    router.post('/addMemberToManagerUnion', managerUnionController.addMemberToManagerUnion);
    router.post('/changeCashierName', managerUnionController.changeCashierName);

    router.get('/controlUnions', controlUnionController.getAllControlUnions);
    router.post('/controlUnions', controlUnionController.createControlUnion);
    router.post('/findControlUnion', controlUnionController.findControlUnionBy);
    router.post('/addMemberToControlUnion', controlUnionController.addMemberToControlUnion);
    router.post('/changeLeaderName', controlUnionController.changeLeaderName);

    router.get('/townshipMessages', townshipMessageController.getAllTownshipMessages);
    router.post('/townshipMessages', townshipMessageController.createTownshipMessage);
    router.post('/findTownshipMessage', townshipMessageController.findTownshipMessageBy);

    router.post('/TownshipLogin', function(req, res) {
        console.log("Township");
        console.log(req.body.authenticationNumber);
        if (req.body.authenticationNumber === "1234567") {
            let response = {
                number: "1234567"
            }
            res.send(response);
        } else {
            res.status(404).send("Not found");
        }
    });

    app.use('/api', router);
};