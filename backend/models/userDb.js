const mongoose = require('mongoose')
const USER_LOGIN_DATA = new mongoose.Schema({
    Name: String,
    User_Name: String,
    email: String,
    password: String,
    image_url: String,
    gender: String,
    Hobbies: {
        type: [String],
        default: []
    },
    totalVotesReceived: { type: Number, default: 0 },
    hasVoted: { type: Boolean, default: false },
    // Add new fields for vote tracking
    valentineVote: {
        votedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'USER_DATA' },
        votedAt: { type: Date },
        revealed: { type: Boolean, default: false }
    }
}, {
    collection: 'USER_DATA'
})

const USER_DATA = new mongoose.model("USER_DATA", USER_LOGIN_DATA)

module.exports = { USER_DATA }