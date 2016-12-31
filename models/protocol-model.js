const mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    floatNumber: {
        type: String,
        required: true
    },
    entrance: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String
    }
});

mongoose.model('Protocol', propertySchema);

module.exports = mongoose.model('Protocol');