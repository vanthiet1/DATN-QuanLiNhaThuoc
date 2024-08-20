const UserModel = require('../../models/userModel/user');
const User = {
    GetAllUser: async (req, res) => {
        try {
            const User = await UserModel.find()
            res.status(200).json(User)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    GetAnUser: async (req, res) => {
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
    DeleteAnUser: async (req, res) => {
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