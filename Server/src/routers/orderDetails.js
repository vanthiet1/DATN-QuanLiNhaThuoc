const Router = require('express').Router();
const OrderDetailController = require('../controllers/orderDetailsController/orderDetails');

Router.post('/create',OrderDetailController.createOrderDetail);
Router.get('/', OrderDetailController.getOrderDetails);
Router.get('/detail/:id', OrderDetailController.getOrderDetailById);
Router.put('/edit/:id', OrderDetailController.updateOrderDetail);
Router.delete('/delete/:id', OrderDetailController.deleteOrderDetail);

module.exports = Router;
