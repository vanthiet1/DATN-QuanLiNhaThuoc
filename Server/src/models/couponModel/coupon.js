const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  discount_value: {
    type: Number,
    required: true,
    min: 0
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  end_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const CouponModel = mongoose.model('Coupon', couponSchema);

module.exports = CouponModel;
