const UserModel = require('../../models/userModel/user');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Auth = {
    Register: async (req, res) => {
        const { fullname, email, password, role_id, phone, is_active } = req.body;
        try {
            if (!req.body.fullname || !req.body.email || !req.body.phone) {
                return res.status(400).json({ message: "Vui lòng nhập cho đầy đủ" });
            }
            //    xử lí
            const userExists = await UserModel.findOne({ email });
            if (userExists !== null) {
                return res.status(400).json({ message: 'Email này đã được đăng ký' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new UserModel({
                fullname,
                email,
                password: hashedPassword,
                role_id,
                phone,
                is_active,
                provider: 'local'
            });



            await newUser.save();
            return res.status(201).json({ message: 'Đăng ký thành công.' ,data:newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Login: async (req, res) => {
    //     try {
    //         //    xử lí
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
}
module.exports = Auth