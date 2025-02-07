const express = require('express')
const { registerUser, loginUser } = require('../controllers/AuthControllers')
const UserRouter = express.Router()


UserRouter.post('/register',registerUser);
UserRouter.post('/login',loginUser);

module.exports = UserRouter;