const mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
    leader: {
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

mongoose.model('ControlUnion', propertySchema);

module.exports = mongoose.model('ControlUnion');