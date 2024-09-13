const Router = require('express').Router()
const RoleController = require('../controllers/roleController/role');

    
// Role: lấy tất cả / tạo sp / lấy chi tiết / cập nhật / xóa
Router.get('/', RoleController.getRoles);
Router.post('/create', RoleController.createRole);
Router.get('/detail/:id', RoleController.getRoleById);
Router.put('/edit/:id', RoleController.updateRole);
Router.delete('/delete/:id', RoleController.deleteRole);

module.exports = Router;
