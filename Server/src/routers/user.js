const User = require('../controllers/userController/user');
const Router = require('express').Router()

Router.get('/', User.GetAllUser)
Router.get('/:id', User.GetAnUser)
Router.delete('/:id', User.DeleteAnUser)


module.exports = Router