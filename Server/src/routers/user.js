const Router = require('express').Router()
const User = require('../controllers/userController/user');

Router.get('/', User.getAllAccount)
Router.get('/customer', User.getAllCustomer)
Router.get('/staff', User.getAllStaff)
Router.get('/staff/:id', User.getAnStaff)
Router.get('/google/:googleId', User.getUserLoginGooogle)
Router.get('/:id', User.getAnUser)
Router.delete('/:id', User.deleteAnUser)
Router.put('/role/:id', User.updateRoleUser)
Router.put('/AccountStatus/:id', User.toggleAccountStatus)



module.exports = Router