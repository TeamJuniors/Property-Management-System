"use strict";
const constants = require('../utils/constants');

function controlUnionController(data) {
    return {
        findControlUnionBy(req, res) {
            let prop = req.body.prop;
            console.log("Find control union by");
            console.log(req.body);
            data.findControlUnionBy(prop).then(controlUnion => {
                res.send(controlUnion);
            }).catch(err => {
                res.status(404).send("Not found");
            });
        },
        createControlUnion(req, res) {
            console.log("Create controlUnion");
            console.log(req.body.controlUnion);
            let controlUnion = req.body.controlUnion;
            let arr = [];
            let c = {
                leader: controlUnion.leader,
                members: arr,
                floatNumber: controlUnion.floatNumber,
                entrance: controlUnion.entrance,
                city: controlUnion.city,
                neighborhood: controlUnion.neighborhood
            };
            data.createControlUnion(c).then(c => {
                res.send(c);
            }).catch(err => {
                res.status(500).send("Cannot create managerUnion");
            });
        },
        getAllControlUnions(req, res) {
            console.log("Test");
            data.getAllControlUnions().then(controlUnion => {
                res.send(controlUnion);
            }).catch(err => {
                res.status(404).send("Cannot get all controlUnions");
            });
        },
        addMemberToControlUnion(req, res) {
            console.log("Add member to control union.");
            let prop = req.body.prop;
            let member = req.body.member;
            data.findUserByUsername(member.username).then((member) => {
                data.addMemberToControlUnion(prop, member).then(union => {
                    res.send(union);
                }).catch(err => {
                    res.status(500).send("Cannot add member to union");
                });
            }).catch(err => {
                res.status(404).send("Error");
            });
        },
        changeLeaderName(req, res) {
            let prop = req.body.prop;
            let leaderShort = req.body.leader;

            data.findUserByUsername(leaderShort.username).then((user) => {
                data.changeLeaderName(prop, user).then(c => {
                    res.send(c);
                }).catch(err => {
                    res.status(404).send("Error");
                });
            });
        }
    };
};

module.exports = controlUnionController;