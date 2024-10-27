const Router = require('express').Router()
const SearchController = require('../controllers/searchController/search');

Router.get('/product', SearchController.searchProductKeyword);
Router.get('/product/query', SearchController.searchProductQuery);
module.exports = Router;

