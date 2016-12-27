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
            let username = req.body.user.username;
            let password = req.body.user.password

            data.createUser(req.body.user);
            console.log(username + " register " + password);
        }
    };
};

module.exports = usersController;