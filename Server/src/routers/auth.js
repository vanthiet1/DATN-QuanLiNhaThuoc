const Router = require('express').Router()
const Auth = require('../controllers/authController/auth');
const accessMiddleware = require('../middlewares/accsessUser')
Router.post('/register', Auth.Register)
Router.post('/login', Auth.Login)
Router.post('/loginGoogle', Auth.LoginGoogle)
Router.post('/refreshToken', Auth.RefreshToken)
Router.post('/logout', Auth.Logout)
Router.post('/sendCodeForgotPassword', Auth.SendCodeForgotPassword)
Router.post('/forgotPassword', Auth.ForgotPassword)
Router.get('/access',accessMiddleware , Auth.AccessUser)
Router.put('/:id', Auth.UpdateRoleUser)

module.exports = Router