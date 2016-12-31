const mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
    apartmentNumber: {
        type: String,
        required: true
    },
    users: {
        type: [{}],
        default: []
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

mongoose.model('Apartment', propertySchema);

module.exports = mongoose.model('Apartment');