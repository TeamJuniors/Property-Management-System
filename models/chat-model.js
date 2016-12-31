const mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    firstUser: {
        type: String,
        required: true
    },
    secondUser: {
        type: String,
        required: true
    },
    firstUserMessages: {
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                time: {
                    type: Date,
                    required: true
                }
            }
        ]
    },
    secondUserMessages: {
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                time: {
                    type: Date,
                    required: true
                }
            }
        ]
    }
});

mongoose.model('Chat', chatSchema);

module.exports = mongoose.model('Chat');