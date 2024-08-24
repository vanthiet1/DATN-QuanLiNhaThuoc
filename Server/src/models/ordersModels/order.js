const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    order_date: { type: Date, required: true },
    status: { type: Number, required: true, default: 1 },
    total_amount: { type: Number, required: true },
    //   code: { type: String, default: '' },
    payment_method: { type: Number, required: true, default: 1 },
    shipping_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
