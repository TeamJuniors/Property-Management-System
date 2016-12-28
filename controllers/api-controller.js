"use strict";
const constants = require('../utils/constants');

function usersController(data) {
    return {
        login(req, res) {
            let username = req.body.username;
            let password = req.body.password;

            console.log(username + " login " + password);
            data.findUserByUsername(username).then(user => {
                let sendUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: "server token",
                    username: user.username,
                    password: user.password,
                    manager: user.isManager
                };
                if (user.password == password) {
                    res.send(JSON.stringify(sendUser));
                } else {
                    res.status(404).send("Wrong password");
                }
            }).catch((err) => {
                res.status(404).send("Wrong username");
            });
        },
        register(req, res) {
            console.log(req.body);
            let user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.username,
                manager: req.body.manager
            }
            let username = user.username;
            let password = user.password

            data.createUser(user).then(() => {
                res.send(user);
            }).catch(err => {
                res.status(404).send("Already exist");
            });
            console.log(username + " register " + password);
        }
    };
};

module.exports = usersController;