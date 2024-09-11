const User = require('../controllers/userController/user');
const Router = require('express').Router()

Router.get('/', User.getAllUser)
Router.get('/google/:googleId', User.getUserLoginGooogle)
Router.get('/:id', User.getAnUser)
Router.delete('/:id', User.deleteAnUser)


module.exports = Router