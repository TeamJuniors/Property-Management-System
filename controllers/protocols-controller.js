"use strict";
const constants = require('../utils/constants');

function protocolController(data) {
    return {
        findProtocolBy(req, res) {
            let prop = req.body.prop;
            data.findProtocolBy(prop).then(protocol => {
                res.send(protocol);
            }).catch(err => {
                res.status(404).send("Not found");
            });
        },
        createProtocol(req, res) {
            console.log("Create protocol");
            console.log(req.body.protocol);
            let protocol = req.body.protocol;
            data.createProtocol(protocol).then(p => {
                res.send(p);
            }).catch(err => {
                res.status(500).send("Cannot create protocol");
            });
        },
        getAllProtocols(req, res) {
            data.getAllProtocols().then(protocols => {
                res.send(protocols);
            }).catch(err => {
                res.status(404).send("Cannot get all protocols");
            });
        }
    };
};

module.exports = protocolController;