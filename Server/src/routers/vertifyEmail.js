const Router = require('express').Router()
const Auth = require('../controllers/authController/auth');
const checkOtpExpiration = require('../middlewares/checkOtp')
Router.post('/verify',checkOtpExpiration, Auth.VerifyCode)
Router.post('/resendVerify', Auth.ResendVerifyCode)

module.exports = Router