const express = require('express');
const Router = express.Router();
const AddressController = require('../controllers/addressController/address');


Router.post('/create', AddressController.createAddress);
Router.get('/', AddressController.getAddresses);
Router.get('/detail/:id', AddressController.getAddressById);
Router.put('/edit/:id', AddressController.updateAddress);
Router.delete('/delete/:id', AddressController.deleteAddress);

module.exports = Router;
