const Router = require('express').Router();
const ProductController = require('../controllers/productController/product');
const upload = require('../middlewares/uploadMiddleware');

Router.get('/', ProductController.getAllProducts);
Router.post('/create', upload.array('productImg', 6), ProductController.createProduct);
Router.get('/best-seller', ProductController.getListProductBestSeller);
Router.get('/new', ProductController.getListProductNew);
Router.get('/recommend', ProductController.getListProductRecommend);
Router.get('/related', ProductController.getListProductRelative);
Router.get('/details/:id', ProductController.getProductWithById);
Router.get('/filter', ProductController.getListProductFilter);
Router.put('/:id', upload.array('productImg', 6), ProductController.updateProduct);
Router.delete('/:id', ProductController.deleteProduct);
Router.get('/:slug', ProductController.getProductWithBySlug);

module.exports = Router;
