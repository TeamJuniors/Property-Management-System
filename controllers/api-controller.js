"use strict";
const constants = require('../utils/constants');

function usersController(data) {
    return {
        login(req, res) {
            let username = req.body.username;
            let password = req.body.password

            console.log(username + " login " + password);
        },
        register(req, res) {
            let username = req.body.username;
            let password = req.body.password

            console.log(username + " register " + password);
        }
    };
};

module.exports = usersController;