const Router = require('express').Router()
const StaffController = require('../controllers/staffController/staff');

Router.get('/', StaffController.getAllStaff);
Router.get('/:id', StaffController.getAnStaff);


module.exports = Router;
