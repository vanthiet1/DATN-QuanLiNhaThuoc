const Router = require('express').Router();
const CouponController = require('../controllers/couponController/coupon');

Router.get('/', CouponController.getCoupons);
Router.post('/create', CouponController.createCoupon);
Router.get('/detail/:id', CouponController.getCouponById);
Router.put('/edit/:id', CouponController.updateCoupon);
Router.delete('/delete/:id', CouponController.deleteCoupon);
Router.get('/active', CouponController.getCouponsActive);

module.exports = Router;
