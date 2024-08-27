const jwt = require('jsonwebtoken');
const User = require('../../models/userModel/user')
const bcrypt = require('bcrypt')
const UserModel = require('../../models/userModel/user');
const RoleModel = require('../../models/roleModel/role');
const sendMail = require('../../helpers/sendMail');
const Auth = {
    Register: async (req, res) => {
        const { fullname, email, password, phone } = req.body;
        try {
            if (!fullname || !email || !phone || !password) {
                return res.status(400).json({ message: "Vui lòng nhập cho đầy đủ" });
            }

            const userExists = await UserModel.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Email này đã được đăng ký' });
            }

            const role = await RoleModel.findOne({ role_Name: "customer" });
            if (!role) {
                return res.status(500).json({ message: 'Role không tồn tại trong hệ thống.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const randomCode = Math.floor(100000 + Math.random() * 900000);

            const timeOtp = new Date(Date.now() + 1 * 60 * 1000);
            const newUser = new UserModel({
                fullname,
                email,
                password: hashedPassword,
                role_id: role._id,
                phone,
                provider: 'local',
                otpVerify: randomCode,
                timeOtp
            });

            await newUser.save();
            await sendMail({
                email: newUser.email,
                subject: "Xác nhận tài khoản",
                randomCode: randomCode
            });
            return res.status(201).json({ message: 'Đăng ký thành công.', data: newUser });
        } catch (error) {
            return res.status(500).json({ message: error.message });
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
    ForgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Email chưa đăng ký không thể thực hiện chức năng" });
            }
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
    UpdateRoleUser: async (req, res) => {
        try {
            const { id } = req.params
            const { role_id } = req.body
            const role = await RoleModel.findOne({ _id: role_id });
            console.log(role);

            if (!role) {
                return res.status(400).json({ message: 'Role không tồn tại' });
            }
            const updatedRole = await UserModel.findByIdAndUpdate(
                id,
                { role_id: role._id },
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
            res.status(500).json({ message: error.message });
        }
    },
    VerifyCode: async (req, res) => {
        try {
            const { email, code } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }

            if (user.otpVerify !== code) {
                return res.status(400).json({ message: "Mã xác nhận không chính xác" });
            }
            if (user.emailVerify) {
                return res.status(400).json({ message: "Tài khoản đã được xác thực trước đó" });
            }
            if (Date.now() > user.timeOtp) {
                return res.status(400).json({ message: "Mã xác nhận đã hết hạn, vui lòng gửi lại" });
            }
            user.emailVerify = true;
            user.otpVerify = undefined;
            user.timeOtp = undefined;

            await user.save();
            res.status(200).json({ message: "Xác nhận thành công", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    ResendVerifyCode: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
            const newVerificationCode = Math.floor(100000 + Math.random() * 900000);

            user.otpVerify = newVerificationCode;
            user.timeOtp = new Date(Date.now() + 1 * 60 * 1000);
            await user.save();

            await sendMail({
                email: user.email,
                subject: "Mã xác thực mới",
                randomCode: `Mã xác thực mới của bạn là: <strong>${newVerificationCode}</strong>`
            });

            await user.save();
            res.status(200).json({ message: "Đã gửi lại mã xác thực", newVerificationCode });
        } catch (error) {
            console.error("Lỗi khi gửi lại mã xác thực:", error);
            res.status(500).json({ message: "Đã xảy ra lỗi khi gửi lại mã xác thực" });
        }
    }
}
module.exports = Auth