const express = require('express');
const CategoryController = require('../controllers/categoryController/category');

const Router = express.Router();

// Đường dẫn để thêm category
Router.post('/create', CategoryController.addCategory);
Router.get('/', CategoryController.getCategory);
Router.get('/:id', CategoryController.getDetailCategory);
Router.delete('/:id', CategoryController.deleteCategory);
Router.put('/:id', CategoryController.updateCategory);

module.exports = Router;
