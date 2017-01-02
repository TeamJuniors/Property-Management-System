const mongoose = require('mongoose');

let feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

mongoose.model('Feedback', feedbackSchema);

module.exports = mongoose.model('Feedback');