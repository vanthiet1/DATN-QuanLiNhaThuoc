const mongoose = require('mongoose');

const HistoryOrderSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    status_from: {
      type: String,
      required: true,
      enum: [1, 2, 3, 4, 5]
    },
    status_to: {
      type: String,
      required: true,
      enum: [1, 2, 3, 4, 5]
    },
    note: {
      type: String,
      trim: true
    },
    updated_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const HistoryOrderModel = mongoose.model('HistoryOrder', HistoryOrderSchema);

module.exports = HistoryOrderModel;
