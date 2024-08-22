const UserModel = require('../../models/userModel/user');
const RoleModel = require('../../models/roleModel/role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Auth = {
    Register: async (req, res) => {
        const { fullname, email, password, phone } = req.body;
        try {
            if (!req.body.fullname || !req.body.email || !req.body.phone) {
                return res.status(400).json({ message: "Vui lòng nhập cho đầy đủ" });
            }
            const userExists = await UserModel.findOne({ email });
            if (userExists !== null) {
                return res.status(400).json({ message: 'Email này đã được đăng ký' });
            }
            const role = await RoleModel.findOne({ role_Name: "customer" });
          console.log(role);
          
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new UserModel({
                fullname,
                email,
                password: hashedPassword,
                role_id: role._id,
                phone,
                provider: 'local'
            });

            await newUser.save();
            return res.status(201).json({ message: 'Đăng ký thành công.', data: newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    Login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
            }
    
            const findUser = await UserModel.findOne({ email })
            if (!findUser) {
                return res.status(400).json({ message: "Tài khoản không tồn tại hoặc chưa được đăng ký" })
            }
            const isPasswordValid = await bcrypt.compare(password, findUser.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Mật khẩu không đúng' });
            }
            const accessToken = jwt.sign(
                { userId: findUser._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' } 
            );

            const refreshToken = jwt.sign(
                { userId: findUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' } 
            );
            res.json({
                message: "Đăng nhập thành công",
                accessToken,
                refreshToken
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    AccessUser: async (req, res) => {
        try {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const userId = decoded.userId;
                const user = await UserModel.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'Không tìm thấy người dùng' });
                }
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình lấy thông tin người dùng' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình lấy thông tin người dùng' });
        }
    },
    UpdateRoleUser: async (req,res)=>{
        try {
             const  {id} = req.params
             const {role_id} = req.body
             const role = await RoleModel.findOne({ _id: role_id });
             console.log(role);
             
             if (!role) {
                 return res.status(400).json({ message: 'Role không tồn tại' });
             }
            const updatedRole = await UserModel.findByIdAndUpdate(
                id,
                { role_id:role._id },
                { new: true }
            );
            if (!updatedRole) {
                return res.status(404).json({ message: 'Không tìm thấy role' });
            }
            res.status(200).json({
                message: 'Chỉnh quyền thành công',
                updatedRole
            });
        } catch (error) {
            res.status(500).json({ message:error.message });
        }
    }

}
module.exports = Auth