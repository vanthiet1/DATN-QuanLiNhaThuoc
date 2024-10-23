const Router = require('express').Router();
const CategoryController = require('../controllers/categoryController/category');


// Đường dẫn để thêm category
Router.post('/create', CategoryController.addCategory);
Router.get('/', CategoryController.getCategory);
Router.get('/:id', CategoryController.getDetailCategory);
Router.delete('/:id', CategoryController.deleteCategory);
Router.put('/:id', CategoryController.updateCategory);

Router.get('/product/:id', CategoryController.getProductWithCategory);



module.exports = Router;
