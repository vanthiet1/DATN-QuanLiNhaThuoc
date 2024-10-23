const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order'
    },
    transaction_id: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      required: true
    },
    payment_methods_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Payment_methods'
    }
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('transaction', transactionSchema);
module.exports = TransactionModel;
