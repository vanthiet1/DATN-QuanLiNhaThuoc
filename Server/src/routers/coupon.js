const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/couponController/coupon');

// Định nghĩa các tuyến đường cho Coupon
router.get('/', CouponController.getCoupons); // Lấy danh sách các Coupon
router.post('/create', CouponController.createCoupon); // Tạo mới Coupon
router.get('/detail/:id', CouponController.getCouponById); // Lấy thông tin Coupon theo ID
router.put('/edit/:id', CouponController.updateCoupon); // Cập nhật Coupon theo ID
router.delete('/delete/:id', CouponController.deleteCoupon); // Xóa Coupon theo ID

module.exports = router;
