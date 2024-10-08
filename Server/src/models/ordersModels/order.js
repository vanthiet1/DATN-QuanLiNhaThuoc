const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_date: { type: Date, required: true },
    status: { type: Number, required: true, default: 1, enum: [1, 2, 3, 4] },
    total_price: { type: Number, required: true },
    total_quantity: { type: Number, required: true },
    sale_type: { type: String, required: true, enum: ['online', 'off'] },
    coupon_id: { type: mongoose.Schema.Types.ObjectId },
    payment_method_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    shipping_address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
