const UserModel = require('../../models/userModel/user');
const RoleModel = require('../../models/roleModel/role')
const User = {
    getAllUser: async (req, res) => {
        try {
            const role = await RoleModel.findOne({ role_Name: "customer" });
            console.log(role);
            
            if (!role) {
                return res.status(500).json({ message: 'Role không tồn tại trong hệ thống.' });
            }
            const user = await UserModel.find({ role_id: role._id })
            .populate("role_id")
            
            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy tài khoản nhân viên nào" });
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAnUser: async (req, res) => {
        try {
            const { id } = req.params
            if(!id){
                return res.status(400).json({message:"Không tìm thấy user"})
            }
            const User = await UserModel.findById(id)
            res.status(200).json(User)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUserLoginGooogle: async (req, res) => {
        try {
            const { googleId } = req.params;
            const userLoginGoogle = await UserModel.findOne({ googleId: googleId })
            if (!userLoginGoogle) {
                return res.status(404).json({ error: "Không tìm thấy user" });
            }
            res.json(userLoginGoogle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteAnUser: async (req, res) => {
        try {
            const { id } = req.params
            if(!id){
                return res.status(400).json({message:"Không tìm thấy user"})
            }
             await UserModel.findByIdAndDelete(id)
            res.status(200).json({message:"Đã xóa thành công người dùng"})
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
}
module.exports = User