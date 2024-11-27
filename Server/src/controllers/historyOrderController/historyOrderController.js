const HistoryOrder = require('../../models/historyOrderModel/historyOrder');

const createHistoryOrder = async (req, res) => {
  try {
    const { order_id, status_from, status_to, note, updated_by_user_id } = req.body;

    const newHistoryOrder = new HistoryOrder({
      order_id,
      status_from,
      status_to,
      note,
      updated_by_user_id
    });

    const savedHistoryOrder = await newHistoryOrder.save();

    return res.status(201).json({
      message: 'History order created successfully!',
      data: savedHistoryOrder
    });
  } catch (error) {
    console.error('Error creating history order:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllHistoryOrders = async (req, res) => {
  try {
    const historyOrders = await HistoryOrder.find().sort({ created_at: -1 }).populate('order_id');
    return res.status(200).json({ data: historyOrders });
  } catch (error) {
    console.error('Error fetching history orders:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getHistoryByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;

    const historyOrders = await HistoryOrder.find({ order_id });
    if (!historyOrders.length) {
      return res.status(404).json({ message: 'No history found for this order ID' });
    }

    return res.status(200).json({ data: historyOrders });
  } catch (error) {
    console.error('Error fetching history by order ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteHistoryOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHistoryOrder = await HistoryOrder.findByIdAndDelete(id);

    if (!deletedHistoryOrder) {
      return res.status(404).json({ message: 'History order not found' });
    }

    return res.status(200).json({
      message: 'History order deleted successfully!',
      data: deletedHistoryOrder
    });
  } catch (error) {
    console.error('Error deleting history order:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createHistoryOrder,
  getAllHistoryOrders,
  getHistoryByOrderId,
  deleteHistoryOrder
};
