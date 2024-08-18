const Auth = require('../controllers/authController/auth');
const Router = require('express').Router()

Router.post('/register', Auth.Register)
// Router.post('/login', UserController.Login)

module.exports = Router