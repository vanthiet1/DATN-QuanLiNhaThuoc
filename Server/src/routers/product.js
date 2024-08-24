const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController/product');

router.get('/', ProductController.getAllProducts);
router.post('/create', ProductController.createProduct);
router.get('/best-seller', ProductController.getListProductBestSeller);
router.get('/new', ProductController.getListProductNew);
router.get('/recommend', ProductController.getListProductRecommend);
router.get('/related', ProductController.getListProductRelative);
router.get('/details/:id', ProductController.getProductWithById);
router.get('/filter', ProductController.getListProductFilter);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;