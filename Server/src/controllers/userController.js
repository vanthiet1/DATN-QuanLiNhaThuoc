const User = require('../models/userModel');


const UserController = {

    Register: async (req, res) => {
        const {
            fullname,
            email,
            password,
            role_id,
            emailVerify,
            phone,
            is_active,
            provider
        } = req.body
        try {
            if (!req.body.email ) {
                return res.status(400).json({ message: "Vui lòng nhập cho đầy đủ" });
            }
            //    xử lí
            const newUser = new UserModel({
                fullname,
                email,
                password: hashedPassword,
                fullname,
                phoneNumber,
            })
            const checkUser = await User.findOne({ email })
            if (!checkUser) {
                return res.status(400).json({ message: "Email này đã được đăng ký" })
            }

            await User.save({ name: "demo" })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    Login: async (req, res) => {
        try {
            //    xử lí
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = UserController