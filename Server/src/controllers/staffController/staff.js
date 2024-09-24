const RoleModel = require('../../models/roleModel/role')
const UserModel = require('../../models/userModel/user')
const staffController =  {
    getAllStaff: async (req, res) => {
        try {
            const role = await RoleModel.findOne({ role_Name: "staff" });
            if (!role) {
                return res.status(500).json({ message: 'Role không tồn tại trong hệ thống.' });
            }
            const staff = await UserModel.find({ role_id: role._id })
            if (!staff) {
                return res.status(404).json({ error: "Không tìm thấy tài khoản nhân viên nào" });
            }
            res.json(staff);
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
    }
    
}
module.exports = staffController
