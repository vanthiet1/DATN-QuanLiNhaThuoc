const RoleModel = require('../../models/roleModel/role');

const RoleController = {
  createRole: async (req, res) => {
    const { role_Name } = req.body;
     console.log(role_Name);
    try {
      const newRole = new RoleModel({ role_Name });
      await newRole.save();
      res.status(201).json({
        message: 'Role mới đã được tạo thành công.',
        role: newRole
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tạo role: ' + error.message });
    }
  },
  getRoles: async (req, res) => {
    try {
      const roles = await RoleModel.find();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách role: ' + error.message });
    }
  },
  getRoleById: async (req, res) => {
    try {
      const { id } = req.params;
      const role = await RoleModel.findById(id);
      if (!role) {
        return res.status(404).json({ message: 'Không tìm thấy role' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy role: ' + error.message });
    }
  },
  updateRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role_Name } = req.body;

      const updatedRole = await RoleModel.findByIdAndUpdate(id, { role_Name }, { new: true });
      if (!updatedRole) {
        return res.status(404).json({ message: 'Không tìm thấy role' });
      }
      res.status(200).json({
        message: 'Role đã được cập nhật thành công.',
        role: updatedRole
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi cập nhật role: ' + error.message });
    }
  },
  deleteRole: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRole = await RoleModel.findByIdAndDelete(id);
      if (!deletedRole) {
        return res.status(404).json({ message: 'Không tìm thấy role' });
      }
      res.status(200).json({ message: 'Role đã bị xóa' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa role: ' + error.message });
    }
  }
  
};

module.exports = RoleController;
