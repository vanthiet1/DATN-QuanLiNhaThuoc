const TransactionModel = require('../../models/transactionModel/transaction');
const OrderModel = require('../../models/ordersModels/order');

const TransactionController = {
  createTransaction: async (req, res) => {
    try {
      const {
        order_id,
        transaction_id,
        amount,
        status,
        payment_methods_id,
        transaction_type,
        response_code,
        description
      } = req.body;

      // Kiểm tra xem đơn hàng có tồn tại không
      const order = await OrderModel.findById(order_id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      const newTransaction = new TransactionModel({
        order_id,
        transaction_id,
        amount,
        status,
        payment_methods_id,
        transaction_type,
        response_code,
        description
      });

      const savedTransaction = await newTransaction.save();
      res.status(201).json({ message: 'Transaction created successfully', data: savedTransaction });
    } catch (error) {
      res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
  },

  getAllTransactions: async (req, res) => {
    try {
      const transactions = await TransactionModel.find().populate('order_id').populate('payment_method_id');
      res.status(200).json({ message: 'Transactions retrieved successfully', data: transactions });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
    }
  },

  getTransactionById: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await TransactionModel.findById(id).populate('order_id payment_methods_id');
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json({ message: 'Transaction retrieved successfully', data: transaction });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
    }
  },

  updateTransactionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, response_code, description } = req.body;

      const updatedTransaction = await TransactionModel.findByIdAndUpdate(
        id,
        { status, response_code, description },
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      res.status(200).json({ message: 'Transaction updated successfully', data: updatedTransaction });
    } catch (error) {
      res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
      if (!deletedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      res.status(200).json({ message: 'Transaction deleted successfully', data: deletedTransaction });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
  }
};

module.exports = TransactionController;
