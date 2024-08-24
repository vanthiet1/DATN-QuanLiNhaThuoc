const express = require('express');
const {
  createOrderDetail,
  getOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail
} = require('../controllers/orderController/orderDetails');

const router = express.Router();

router.post('/create', createOrderDetail);
router.get('/', getOrderDetails);
router.get('/detail/:id', getOrderDetailById);
router.put('/edit/:id', updateOrderDetail);
router.delete('/delete/:id', deleteOrderDetail);

module.exports = router;
