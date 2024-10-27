const Router = require('express').Router();
const VnpayController = require('../controllers/vnpayController/VnpayController');

Router.post('/create_payment_url', VnpayController.createPaymentUrl);
Router.get('/vnpay_return', VnpayController.handleVnpayReturn);
Router.get('/querydr', VnpayController.querydr);
module.exports = Router;
