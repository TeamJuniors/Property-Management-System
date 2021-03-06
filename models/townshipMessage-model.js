const mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    from: {
        type: Object,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    answer: {
        type: String
    }
});

mongoose.model('TownshipMessage', propertySchema);

module.exports = mongoose.model('TownshipMessage');