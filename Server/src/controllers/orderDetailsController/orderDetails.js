const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');
const ImageProduct = require('../../models/imageModels/image');
const mongoose = require('mongoose');
const ImageProduct = require('../../models/imageModels/image');

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
      if (!ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'order id không hợp lệ' });
      }
      const orderDetailsConditions = { order_id: new ObjectId(orderId) };
      const orderDetail = await OrderDetailsModel.aggregate([
        { $match: orderDetailsConditions },
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

      if (!orderDetail.length) {
        return res.status(404).json({ message: 'Không tìm thấy chi tiết order' });
      }
      const productIds = orderDetail.map((item) => item.product_id);
      const imagesByProductId = await ImageProduct.find({ product_id: { $in: productIds } });
      const orderProductDetail = orderDetail.map((product) => {
        const productImages = imagesByProductId.filter(
          (img) => img.product_id.toString() === product.product_id.toString()
        );
        return {
          ...product,
          images: productImages
        };
      });
      res.status(200).json(orderProductDetail);
    } catch (error) {
      console.error('Error in getOrderDetailByOrderId:', error.message);
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
