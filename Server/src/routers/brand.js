const Router = require('express').Router();
const brandController = require('../controllers/brandController/brand');


Router.post('/create', brandController.createBrand);
Router.get('/', brandController.getBrand);
Router.get('/:id', brandController.getDetailBrand);
Router.delete('/:id', brandController.deleteBrand);
Router.put('/:id', brandController.updateBrand);

module.exports = Router;
