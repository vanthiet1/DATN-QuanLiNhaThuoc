const OrderModel = require('../../models/ordersModels/order');
const AddressModel = require('../../models/addressModel/address')
const OrderController = {
  createOrder: async (req, res) => {
    const { user_id, order_date, status, total_amount, payment_method } = req.body;
    try {
      const address = await AddressModel.findOne({ user_id });
      if (!address) {
        return res.status(400).json({ message: 'Người dùng chưa có địa chỉ, vui lòng thêm địa chỉ trước khi đặt hàng.' });
      }
      const order = new OrderModel({
        user_id,
        order_date,
        status,
        total_amount,
        payment_method,
        shipping_address: address
      });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderModel.find({}).populate('user_id')
        .populate('shipping_address')
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    const { id } = req.params
    try {
      const order = await OrderModel.findById(id)
        .populate('user_id')
        .populate('shipping_address')
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderByUserId: async (req, res) => {
    const { user_id } = req.params
    try {
      if (!user_id) {
        return res.status(400).json({ message: 'Thiếu thông tin user' });
      }
      const orderUser = await OrderModel.findOne({ user_id: user_id })
        .populate('user_id')
        .populate('shipping_address')

      if (!orderUser) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }
      res.status(200).json(orderUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOrder: async (req, res) => {
    const { id } = req.params
    const {status , payment_method} = req.body
    try {
      const order = await OrderModel.findByIdAndUpdate(id, {status, payment_method}, { new: true });
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  userCancelOrder: async (req, res) => {
    const { id } = req.params
    const { user_id } = req.body
    try {
      if (!user_id) {
        return res.status(400).json({ message: 'Thiếu thông tin user' });
      }

      const order = await OrderModel.findById(id)
      if (order.user_id.toString() !== user_id) {
        return res.status(400).json({ message: 'Đơn hàng này không phải của bạn không được hủy' });
      }
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status: 2 }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params
    try {
      const order = await OrderModel.findByIdAndDelete(id);
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json({ message: 'Xóa đơn hàng thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}

module.exports = OrderController