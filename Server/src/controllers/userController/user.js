const UserModel = require('../../models/userModel/user');
const RoleModel = require('../../models/roleModel/role')
const User = {
    getAllAccount: async (req, res) => {
        try {
            const user = await UserModel.find({})
                .populate("role_id")
            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy tài khoản nhân viên nào" });
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllCustomer: async (req, res) => {
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
    getAllStaff: async (req, res) => {
        try {
            const role = await RoleModel.findOne({ role_Name: "staff" });
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
    getAnStaff: async(req,res)=>{
        const {id} = req.params
         try {
             if(!id){
                return res.status(400).json({ message:"Không tìm thấy nhân viên này"})
             }
             const role = await RoleModel.findOne({ role_Name: "staff" });
             const staff = await UserModel.findOne({ _id:id })
             if (!role._id.equals(staff.role_id)) {
                return res.status(400).json({ message: "Không phải là nhân viên" });
            }
             res.json(staff)
         } catch (error) {
             res.status(500).json({ message: error.message });
         }
    },

    getAnUser: async (req, res) => {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: "Không tìm thấy user" })
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
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Không tìm thấy user" })
            }
            await UserModel.findByIdAndDelete(id)
            res.status(200).json({ message: "Đã xóa thành công người dùng" })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    toggleAccountStatus: async (req, res) => {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: "Không tìm thấy user" })
            }
            const getUser = await UserModel.findById(id)
            if (!getUser) {
                return res.status(404).json({ message: "Không tìm thấy user" })
            }
            let updatedUser;
            let actionMessage = '';
            if (getUser.is_active === 1) {
                updatedUser = await UserModel.findByIdAndUpdate(id, { is_active: 0 }, { new: true });
                actionMessage = 'Đã khóa tài khoản';
            } else {
                updatedUser = await UserModel.findByIdAndUpdate(id, { is_active: 1 }, { new: true });
                actionMessage = 'Đã mở khóa tài khoản';

            }

            res.status(200).json({ message: actionMessage })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateRoleUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { role_id } = req.body;
            if (!id) {
                return res.status(400).json({ message: "Không tìm thấy user" });
            }
            if (!role_id) {
                return res.status(400).json({ message: "Vui lòng cung cấp role_id" });
            }
            const role = await RoleModel.findById(role_id);
            if (!role) {
                return res.status(404).json({ message: "Role không tồn tại trong hệ thống" });
            }
            const updatedUser = await UserModel.findByIdAndUpdate(id, { role_id: role._id }, { new: true }).populate('role_id');
            res.status(200).json({ message: "Đã cập nhật vai trò thành công", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = User