const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_date: { type: Date, required: true },
    status: { type: Number, required: true, default: 1 },
    total_price: { type: Number, required: true },
    total_quantity: { type: Number, required: true },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    payment_method_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    shipping_address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
