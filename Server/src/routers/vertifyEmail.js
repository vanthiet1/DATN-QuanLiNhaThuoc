const Router = require('express').Router()
const Auth = require('../controllers/authController/auth');

Router.post('/verify', Auth.VerifyCode)
Router.post('/resendVerify', Auth.ResendVerifyCode)

module.exports = Router