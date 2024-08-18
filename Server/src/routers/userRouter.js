const UserController = require('../controllers/userController');
const Router = require('express').Router()

Router.post('/register', UserController.Register)
Router.post('/login', UserController.Login)

module.exports = Router