const { Schema, model } = require('mongoose');

const EventSchema = Schema(
    {
        title: {
            type: String,
            require: true
        },
        notes: {
            type: Array,
            require: true
        },
        start: {
            type: Date,
            require: true
        },
        end: {
            type: Date,
            require: true
        },
        bgColor: {
            type: String,
            require: true
        },
        user: {
            type: String,
            require: true
        },
    }
);

module.exports = model('Event', EventSchema);