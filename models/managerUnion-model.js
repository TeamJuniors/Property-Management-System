const mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
    cashier: {
        type: Object
    },
    manager: {
        type: Object
    },
    members: {
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

mongoose.model('ManagerUnion', propertySchema);

module.exports = mongoose.model('ManagerUnion');