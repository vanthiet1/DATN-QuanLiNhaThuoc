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
      required: true,
      unique: true
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: 'Amount cannot be negative.'
      }
    },
    currency: {
      type: String,
      enum: ['VND', 'USD', 'EUR', 'GBP'],
      default: 'VND'
    },
    status: {
      type: String,
      required: true
    },
    transaction_type: {
      type: String,
      enum: ['payment', 'refund', 'adjustment'],
      required: true
    },
    payment_method_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Payment_methods'
    },
    response_code: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = TransactionModel;
