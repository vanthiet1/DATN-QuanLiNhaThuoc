const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');

const createOrderDetail = async (req, res) => {
  try {
    const { product_id, order_id, price, quantity } = req.body;
    const orderDetail = new OrderDetailsModel({ product_id, order_id, price, quantity });
    await orderDetail.save();
    res.status(201).json(orderDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetailsModel.find().lean();
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderDetailById = async (req, res) => {
  try {
    const orderDetail = await OrderDetailsModel.findById(req.params.id).populate('product_id order_id');
    if (!orderDetail) return res.status(404).json({ message: 'Order detail not found' });
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderDetail = async (req, res) => {
  try {
    const orderDetail = await OrderDetailsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!orderDetail) return res.status(404).json({ message: 'Order detail not found' });
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrderDetail = async (req, res) => {
  try {
    const orderDetail = await OrderDetailsModel.findByIdAndDelete(req.params.id);
    if (!orderDetail) return res.status(404).json({ message: 'Order detail not found' });
    res.status(200).json({ message: 'Order detail deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrderDetail,
  getOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail
};
