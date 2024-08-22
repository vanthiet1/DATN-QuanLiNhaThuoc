const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController/product');

router.get('/', ProductController.getAllProducts);
router.post('/create', ProductController.createProduct);
router.get('/best-seller', ProductController.getListProductBestSeller);

// router.get('/detail/:id', ProductController.getCouponById);
// router.put('/edit/:id', ProductController.updateCoupon);
// router.delete('/delete/:id', ProductController.deleteCoupon);
module.exports = router;
