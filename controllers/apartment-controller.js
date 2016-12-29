"use strict";
const constants = require('../utils/constants');

function apartmentsController(data) {
    return {
        findApartmentBy(req, res) {
            let floatNumber = req.body.floatNumber;
            let entrance = req.body.entrance;
            let city = req.body.city;
            let neighborhood = req.body.neighborhood;
            let apartmentNumber = req.body.apartmentNumber;

            data.findApartmentBy(floatNumber, entrance, city, neighborhood, apartmentNumber).then(apartment => {
                res.send(apartment);
            }).catch(err => {
                res.status(404).send("Not found");
            });
        },
        createApartment(req, res) {
            //console.log("Hello from apartments controller");

            let apartment = {
                apartmentNumber: req.body.apartmentNumber,
                users: req.body.users,
                floatNumber: req.body.floatNumber,
                entrance: req.body.entrance,
                city: req.body.city,
                neighborhood: req.body.neighborhood
            };
            //console.log(apartment);
            data.createApartment(apartment).then(a => {
                res.send(apartment);
            }).catch(err => {
                res.status(500).send("Cannot create apartment");
            });
        },
        getAllApartments(req, res) {
            data.getAllApartments().then(apartments => {
                res.send(apartments);
            }).catch(err => {
                res.status(404).send("Cannot get all apartments");
            });
        },
        addUserToApartment(req, res) {
            console.log("Add user to apartment.");
            let floatNumber = req.body.apartment.floatNumber;
            let entrance = req.body.apartment.entrance;
            let city = req.body.apartment.city;
            let neighborhood = req.body.apartment.neighborhood;
            let apartmentNumber = req.body.apartment.apartmentNumber;
            let user = req.body.user;
            console.log(req.body);
            data.addUserToAppartment(floatNumber, entrance, city, neighborhood, apartmentNumber, user).then(apartment => {
                res.send(apartment);
            }).catch(err => {
                res.status(500).send("Cannot add user to apartment");
            });
        }
    };
};

module.exports = apartmentsController;