const Router = require('express').Router();
const paymentMethodController = require('../controllers/paymentMethodController/paymentMethod');

Router.post('/create', paymentMethodController.createPaymentMethod);
Router.get('/', paymentMethodController.getPaymentMethod);
Router.delete('/:id', paymentMethodController.deletePaymentMethod);
Router.put('/:id', paymentMethodController.updatePaymentMethod);

module.exports = Router;
