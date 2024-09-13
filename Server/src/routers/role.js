const Router = require('express').Router()
const RoleController = require('../controllers/roleController/role');

Router.get('/', RoleController.getRoles);
Router.post('/', RoleController.createRole);
Router.get('/:id', RoleController.getRoleById);
Router.put('/:id', RoleController.updateRole);
Router.delete('/:id', RoleController.deleteRole);

module.exports = Router;
