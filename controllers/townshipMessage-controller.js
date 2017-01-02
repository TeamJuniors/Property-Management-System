"use strict";
const constants = require('../utils/constants');

function townshipMessageController(data) {
    return {
        findTownshipMessageBy(req, res) {
            let prop = req.body.prop;
            console.log("Getting township");
            console.log(prop);
            data.findTownshipMessageByUser(prop).then(msg => {
                res.send(msg);
            }).catch(err => {
                res.status(404).send("Not found");
            });
        },
        setAnswerToTownshipMessage(req, res) {
            let prop = req.body.prop;
            let newContent = req.body.newContent;
            data.setAnswerToTownshipMessage(prop, newContent).then((msg) => {
                res.send(msg);
            });
        },
        createTownshipMessage(req, res) {
            console.log("Create message");
            console.log(req.body.townshipMessage);
            let townshipMessage = req.body.townshipMessage;
            data.createTownshipMessage(townshipMessage).then(msg => {
                res.send(msg);
            }).catch(err => {
                res.status(500).send("Cannot create message");
            });
        },
        getAllTownshipMessages(req, res) {
            data.getAllTownshipMessages().then(msgs => {
                res.send(msgs);
            }).catch(err => {
                res.status(404).send("Cannot get all messages");
            });
        }
    };
};

module.exports = townshipMessageController;