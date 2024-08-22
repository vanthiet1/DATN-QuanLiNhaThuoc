const express = require('express');
const SubCategoryController = require('../controllers/subCategoryController/subCategory');

const Router = express.Router();

Router.post('/create', SubCategoryController.addSubCategory);
Router.get('/', SubCategoryController.getSubCategory);
Router.delete('/:id', SubCategoryController.deleteSubCategory);
Router.put('/:id', SubCategoryController.updateSubCategory);

module.exports = Router;
