"use strict";
const constants = require('../utils/constants');

function feedbackController(data) {
    return {
        sendFeedback(req, res) {
            const feedback = {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                message: req.body.message,
            };

            data.createFeedback(feedback)
                .then((createdFeedback) => {
                    res.send('Feedback sent successfully');
                }).catch((err) => {
                    res.send('Feedback not sent successfully');
                });
        },
        getFeedback(req, res) {
            data.getAllFeedback()
                .then((feedback) => {
                    res.send(JSON.stringify(feedback));
                }).catch((err) => {
                    console.log(err);
                    res.send({});
                });
        }
    };
};

module.exports = feedbackController;