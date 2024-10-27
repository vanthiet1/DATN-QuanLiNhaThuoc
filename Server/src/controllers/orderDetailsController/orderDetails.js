const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');
const mongoose = require('mongoose');

const OrderDetailController = {
  createOrderDetail: async (req, res) => {
    try {
      const { product_id, order_id, price, quantity } = req.body;
      const orderDetail = new OrderDetailsModel({ product_id, order_id, price, quantity });
      await orderDetail.save();
      res.status(201).json(orderDetail);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getOrderDetailByOrderId: async (req, res) => {
    try {
      const orderId = req.params.id;
      const { ObjectId } = mongoose.Types;
      const orderIdConvert = new ObjectId(orderId);
      if (!orderIdConvert) {
        return res.status(404).json({ message: 'order id không tồn tại' });
      }

      const orderDetailsConditions = {};
      if (orderId) {
        orderDetailsConditions.order_id = orderIdConvert;
      }

      const orderDetail = await OrderDetailsModel.aggregate([
        {
          $match: orderDetailsConditions
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' }
      ]);

      if (!orderDetail) return res.status(404).json({ message: 'không tìm thấy order details' });
      res.status(200).json(orderDetail);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOrderDetail: async (req, res) => {
    try {
      const orderDetail = await OrderDetailsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!orderDetail) return res.status(404).json({ message: 'Order detail not found' });
      res.status(200).json(orderDetail);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteOrderDetail: async (req, res) => {
    try {
      const orderDetail = await OrderDetailsModel.findByIdAndDelete(req.params.id);
      if (!orderDetail) return res.status(404).json({ message: 'Order detail not found' });
      res.status(200).json({ message: 'Order detail deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = OrderDetailController;
