const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Orders', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { timestamps: true }
);

const OrderDetailsModel = mongoose.model('OrderDetails', orderDetailsSchema);

module.exports = OrderDetailsModel;
