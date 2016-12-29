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
                    manager: user.isManager,
                    imgUrl: user.imgUrl,
                    flatNumber: user.flatNumber,
                    apartmentNumber: user.apartmentNumber,
                    exitNumber: user.exitNumber,
                    city: user.city,
                    neighborhood: user.neighborhood
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
            let user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                manager: req.body.manager,
                flatNumber: req.body.flatNumber,
                apartmentNumber: req.body.apartmentNumber,
                exitNumber: req.body.exitNumber,
                city: req.body.city,
                neighborhood: req.body.neighborhood,
                imgUrl: req.body.imgUrl || '',
                facebookAuthToken: req.body.facebookAuthToken || ''
            }

            let username = user.username;
            let password = user.password

            data.createUser(user).then(() => {
                res.send(user);
            }).catch(err => {
                res.status(404).send("Already exist");
            });
        },
        changeImage(req, res) {
            console.log("Change img");

            console.log(req.body);

            let username = req.body.username;
            let password = req.body.password;
            let imgUrl = req.body.imgUrl;

            data.changeUserImage(username, password, imgUrl).then((user) => {
                res.send(user);
            }).catch(err => {
                res.status(404).send("Invalid username and password");
            });
        },
        getUserByFacebookAuthToken(req, res) {
            console.log("facebookAuthToken " + req.body.facebookAuthToken);
            console.log(req.body)

            let facebookAuthToken = req.body.facebookAuthToken;

            data.findUserByFacebookAuthToken(facebookAuthToken).then((user) => {
                res.send(user);
            }).catch(err => {
                res.status(404).send("Not authenricated");
            });
        }
    };
};

module.exports = usersController;