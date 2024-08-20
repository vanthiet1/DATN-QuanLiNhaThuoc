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
    }
});

const CouponModal = mongoose.model('Coupon', couponSchema);

module.exports = CouponModal;
