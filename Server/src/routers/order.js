const Router = require('express').Router();
const OrderController = require('../controllers/orderController/order');
const OrderOffController = require('../controllers/orderOffController/orderOffController');
const upload = require('../middlewares/uploadMiddleware');

Router.post('/', upload.single('prescriptionImage'), OrderController.createOrder);
Router.get('/', OrderController.getAllOrders);
Router.get('/detail/:user_id', OrderController.getOrderByUserId);
Router.get('/:id', OrderController.getOrderById);
Router.put('/:id', OrderController.updateOrder);
Router.put('/cancel/:id', OrderController.userCancelOrder);
Router.delete('/:id', OrderController.deleteOrder);
Router.post('/create-order-off', upload.single('prescriptionImage'), OrderOffController.createOrder);

module.exports = Router;
