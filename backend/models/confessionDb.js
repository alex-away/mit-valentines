const mongoose = require('mongoose')

const CONFESSION_SCHEMA = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'CONFESSIONS'
})

const CONFESSIONS = mongoose.model("CONFESSIONS", CONFESSION_SCHEMA)

module.exports = { CONFESSIONS } 