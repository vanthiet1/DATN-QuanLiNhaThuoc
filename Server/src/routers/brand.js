const express = require('express');
const brandController = require('../controllers/brandController/brand');

const Router = express.Router();

Router.post('/create', brandController.createBrand);
Router.get('/', brandController.getBrand);
Router.delete('/:id', brandController.deleteBrand);
Router.put('/:id', brandController.updateBrand);

module.exports = Router;
