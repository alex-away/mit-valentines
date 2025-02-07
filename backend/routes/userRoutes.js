const express = require('express')
const { registerUser, loginUser } = require('../controllers/AuthControllers');
const { findMatch } = require('../controllers/FindMatch');
const UserRouter = express.Router()


UserRouter.post('/register',registerUser);
UserRouter.post('/login',loginUser);

UserRouter.post('/find-match',findMatch);
module.exports = UserRouter;