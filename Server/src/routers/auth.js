const Auth = require('../controllers/authController/auth');
const Router = require('express').Router()
const accessMiddleware = require('../middlewares/accsessUser')
Router.post('/register', Auth.Register)
Router.post('/login', Auth.Login)
Router.get('/access',accessMiddleware , Auth.AccessUser)
Router.put('/:id', Auth.UpdateRoleUser)




module.exports = Router