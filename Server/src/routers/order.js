const Router = require('express').Router();
const OrderController = require('../controllers/orderController/order');
const OrderOffController = require('../controllers/orderOffController/orderOffController');
const upload = require('../middlewares/uploadMiddleware');

Router.post('/', upload.single('prescriptionImage'), OrderController.createOrder);
Router.get('/', OrderController.getAllOrders);
Router.get('/detail/:user_id', OrderController.getOrderByUserId);
Router.get('/:id', OrderController.getOrderById);
Router.put('/:id', OrderController.updateOrder);
Router.put('/bank/:id', OrderController.updatePayOrder);
Router.put('/cancel/:id', OrderController.userCancelOrder);
Router.delete('/:id', OrderController.deleteOrder);
Router.post('/difference/payment', OrderController.processPaymentDifference);
Router.post('/cancel-order/send-mail', OrderController.sendMailCancelOrder);
Router.post('/order-sucsess/send-mail', OrderController.sendMailOrderSuccsess);
Router.post('/create-order-off', upload.single('prescriptionImage'), OrderOffController.createOrder);

module.exports = Router;
