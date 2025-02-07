const express = require('express')
const { postConfession, getConfessions } = require('../controllers/ConfessionController')
const ConfessionRouter = express.Router()

ConfessionRouter.post('/post', postConfession)
ConfessionRouter.get('/all', getConfessions)

module.exports = ConfessionRouter 