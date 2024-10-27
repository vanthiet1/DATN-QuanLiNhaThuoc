const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['thanh toán khi nhận hàng', 'thanh toán qua online momo', 'thanh toán qua online Vnpay']
    },
    type: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const PaymentMethodModel = mongoose.model('Payment_methods', PaymentMethodSchema);
module.exports = PaymentMethodModel;
