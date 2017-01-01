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
            data.createManagerUnion(managerUnion).then(m => {
                res.send(m);
            }).catch(err => {
                res.status(500).send("Cannot create managerUnion");
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