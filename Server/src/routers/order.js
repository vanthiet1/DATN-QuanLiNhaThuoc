const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController/order');

router.post('/create', createOrder);         
router.get('/', getOrders);            
router.get('/detail/:id', getOrderById);     
router.put('/edit/:id', updateOrder);      
router.delete('/delete/:id', deleteOrder);   

module.exports = router;
