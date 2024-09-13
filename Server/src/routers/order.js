const Router = require('express').Router();
const OrderController = require('../controllers/orderController/order')

Router.post('/', OrderController.createOrder);         
Router.get('/', OrderController.getAllOrders);            
Router.get('/detail/:user_id', OrderController.getOrderByUserId);     
Router.get('/:id', OrderController.getOrderById);     
Router.put('/:id', OrderController.updateOrder);      
Router.put('/cancel/:id', OrderController.userCancelOrder);   
Router.delete('/:id', OrderController.deleteOrder);   



module.exports = Router;