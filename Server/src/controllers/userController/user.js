const UserModel = require('../../models/userModel/user');
const User = {
    getAllUser: async (req, res) => {
        try {
            const User = await UserModel.find()
            res.status(200).json(User)
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