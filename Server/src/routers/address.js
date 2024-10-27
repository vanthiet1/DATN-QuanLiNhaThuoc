const Router = require('express').Router()
const AddressController = require('../controllers/addressController/address');

Router.post('/', AddressController.addAddress);
Router.get('/', AddressController.getAddress);
Router.get('/:id', AddressController.getAddressById);
Router.put('/user/:userId', AddressController.updateAddressUser);
Router.put('/:id', AddressController.updateAddress);
Router.delete('/:id', AddressController.deleteAddress);
Router.get('/detail/:user_id', AddressController.getAddressByUserId);

module.exports = Router;
