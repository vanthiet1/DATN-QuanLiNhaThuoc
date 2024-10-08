const Router = require('express').Router()
const SubCategoryController = require('../controllers/subCategoryController/subCategory');

Router.post('/create', SubCategoryController.addSubCategory);
Router.get('/', SubCategoryController.getSubCategory);
Router.get('/:id', SubCategoryController.getOneSubCategory);
Router.delete('/:id', SubCategoryController.deleteSubCategory);
Router.put('/:id', SubCategoryController.updateSubCategory);

module.exports = Router;
