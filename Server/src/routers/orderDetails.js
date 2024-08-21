const express = require('express');
const {
  createOrderDetail,
  getOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail
} = require('../controllers/orderController/orderDetails');

const router = express.Router();

router.post('/order-details/add', createOrderDetail);
router.get('/order-details', getOrderDetails);
router.get('/order-details/:id', getOrderDetailById);
router.put('/order-details/:id', updateOrderDetail);
router.delete('/order-details/:id', deleteOrderDetail);

module.exports = router;
