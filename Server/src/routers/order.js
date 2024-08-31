const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController/order')

router.post('/', OrderController.createOrder);         
router.get('/', OrderController.getAllOrders);            
router.get('/detail/:user_id', OrderController.getOrderByUserId);     
router.get('/:id', OrderController.getOrderById);     
router.put('/:id', OrderController.updateOrder);      
router.put('/cancel/:id', OrderController.userCancelOrder);   
router.delete('/:id', OrderController.deleteOrder);   



module.exports = router;