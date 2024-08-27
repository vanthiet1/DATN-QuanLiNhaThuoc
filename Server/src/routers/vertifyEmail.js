const Auth = require('../controllers/authController/auth');
const Router = require('express').Router()

Router.post('/verify', Auth.VerifyCode)
Router.post('/resendVerify', Auth.ResendVerifyCode)

module.exports = Router