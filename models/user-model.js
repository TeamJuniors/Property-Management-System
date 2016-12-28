const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true
    },
    imgUrl: {
        type: String
    },
    flatNumber: {
        type: String,
        required: true
    },
    apartmentNumber: {
        type: String,
        required: true
    },
    exitNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    }
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');