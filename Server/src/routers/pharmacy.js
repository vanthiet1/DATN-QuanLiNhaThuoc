const Router = require('express').Router();
const pharmacyController = require('../controllers/pharmacyController/pharmacyController');

Router.post('/create', pharmacyController.createPharmacy);
Router.get('/', pharmacyController.getPharmacy);
Router.delete('/:id', pharmacyController.deletePharmacy);
Router.put('/:id', pharmacyController.updatePharmacy);

module.exports = Router;
