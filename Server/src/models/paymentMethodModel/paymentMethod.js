const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema(
  {
    name: {
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
