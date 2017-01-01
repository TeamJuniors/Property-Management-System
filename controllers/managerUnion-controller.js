"use strict";
const constants = require('../utils/constants');

function managerUnionController(data) {
    return {
        findManagerUnionBy(req, res) {
            let prop = req.body.prop;
            console.log("Find manager union by");
            console.log(req.body);
            data.findManagerUnionBy(prop).then(managerUnion => {
                res.send(managerUnion);
            }).catch(err => {
                res.status(404).send("Not found");
            });
        },
        createManagerUnion(req, res) {
            console.log("Create managerUnion");
            console.log(req.body.managerUnion);
            let managerUnion = req.body.managerUnion;
            data.getAllUsers().then(users => {
                let manager;
                for (let i = 0; i < users.length; i++) {
                    console.log("User: " + i);
                    console.log(users[i]);
                    if (users[i].flatNumber === managerUnion.floatNumber &&
                        users[i].exitNumber === managerUnion.entrance &&
                        users[i].city === managerUnion.city &&
                        users[i].neighborhood === managerUnion.neighborhood &&
                        users[i].isManager === true) {
                        manager = users[i];
                    }
                }
                console.log("Manager");
                console.log(manager);
                let arr = [];
                let p = {
                    cashier: {
                        username: managerUnion.cashier.username
                    },
                    manager: manager,
                    members: arr,
                    floatNumber: managerUnion.floatNumber,
                    entrance: managerUnion.entrance,
                    city: managerUnion.city,
                    neighborhood: managerUnion.neighborhood
                };
                data.createManagerUnion(p).then(m => {
                    res.send(m);
                }).catch(err => {
                    res.status(500).send("Cannot create managerUnion");
                });
            }).catch(err => {
                res.status(500).send("Cannot find users");
            });
        },
        getAllManagerUnions(req, res) {
            console.log("Test");
            data.getAllManagerUnions().then(managerUnions => {
                res.send(managerUnions);
            }).catch(err => {
                res.status(404).send("Cannot get all managerUnions");
            });
        },
        addMemberToManagerUnion(req, res) {
            console.log("Add member to manager union.");
            let prop = req.body.prop;
            let member = req.body.member;
            data.findUserByUsername(member.username).then((member) => {
                data.addMemberToManagerUnion(prop, member).then(union => {
                    res.send(union);
                }).catch(err => {
                    res.status(500).send("Cannot add member to union");
                });
            }).catch(err => {
                res.status(404).send("Error");
            });
        },
        changeCashierName(req, res) {
            let prop = req.body.prop;
            let cashierShort = req.body.cashier;

            data.findUserByUsername(cashierShort.username).then((user) => {
                data.changeCashierName(prop, user).then(c => {
                    res.send(c);
                }).catch(err => {
                    res.status(404).send("Error");
                });
            });
        }
    };
};

module.exports = managerUnionController;