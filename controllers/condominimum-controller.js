"use strict";
const constants = require('../utils/constants');

function condominimumController(data) {
    return {
        findCondominimumBy(req, res) {
            let floatNumber = req.body.floatNumber;
            let entrance = req.body.entrance;
            let city = req.body.city;
            let neighborhood = req.body.neighborhood;

            data.findCondominimumBy(floatNumber, entrance, city, neighborhood).then(condominimum => {
                res.send(condominimum);
            }).catch(err => {
                res.status(404).send("Not found");
            });
        },
        createCondominium(req, res) {
            let condominimum = {
                manager: req.body.manager,
                apartments: req.body.apartments,
                floatNumber: req.body.floatNumber,
                entrance: req.body.entrance,
                city: req.body.city,
                neighborhood: req.body.neighborhood
            }
            data.createCondominium(condominium).then(a => {
                res.send("Create successfully condominium");
            }).catch(err => {
                res.status(500).send("Cannot create condominium");
            });
        },
        getAllCondominiums(req, res) {
            data.getAllCondominiums().then(condominiums => {
                res.send(condominiums);
            }).catch(err => {
                res.status(404).send("Cannot get all apartments");
            });
        },
        addApartmentToCondominium(req, res) {
            let floatNumber = req.body.floatNumber;
            let entrance = req.body.entrance;
            let city = req.body.city;
            let neighborhood = req.body.neighborhood;
            let apartment = req.body.apartment;

            data.addUserToAppartment(floatNumber, entrance, city, neighborhood, apartment).then(condominium => {
                res.send("Successfully added user to apartment");
            }).catch(err => {
                res.status(404).send("Cannot add user to apartment");
            });
        }
    };
};

module.exports = condominimumController;