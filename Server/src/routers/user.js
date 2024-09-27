const Router = require('express').Router()
const User = require('../controllers/userController/user');

Router.get('/', User.getAllUser)
Router.get('/google/:googleId', User.getUserLoginGooogle)
Router.get('/:id', User.getAnUser)
Router.delete('/:id', User.deleteAnUser)
Router.put('/AccountStatus/:id', User.toggleAccountStatus)



module.exports = Router