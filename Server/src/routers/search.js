const Router = require('express').Router()
const SearchController = require('../controllers/searchController/search');

Router.get('/product', SearchController.searchProduct);

module.exports = Router;

