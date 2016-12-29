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
            console.log("Hello from create condominium");
            let condominimum = {
                apartments: req.body.apartments,
                floatNumber: req.body.floatNumber,
                entrance: req.body.entrance,
                city: req.body.city,
                neighborhood: req.body.neighborhood
            }
            console.log(condominimum);
            data.createCondominium(condominimum).then(a => {
                res.send(a);
            }).catch(err => {
                res.status(500).send("Cannot create condominium");
            });
        },
        getAllCondominiums(req, res) {
            data.getAllCondominiums().then(condominimum => {
                res.send(condominimum);
            }).catch(err => {
                res.status(404).send("Cannot get all apartments");
            });
        },
        AddUserToApartmentInCondominium(req, res) {
            let apartment = req.body.apartment;
            let user = req.body.user;
            let condominium = req.body.condominium;

            data.AddUserToApartmentInCondominium(condominium, apartment, user).then((cond) => {
                res.send(cond);
            }).catch(err => {
                res.status(401).send("Error");
            });
        },
        addApartmentToCondominium(req, res) {
            let floatNumber = req.body.condominium.floatNumber;
            let entrance = req.body.condominium.entrance;
            let city = req.body.condominium.city;
            let neighborhood = req.body.condominium.neighborhood;
            let apartment = req.body.apartment;

            data.addApartmentToCondominium(floatNumber, entrance, city, neighborhood, apartment).then(condominium => {
                res.send(condominium);
            }).catch(err => {
                res.status(404).send("Cannot add user to apartment");
            });
        }
    };
};

module.exports = condominimumController;