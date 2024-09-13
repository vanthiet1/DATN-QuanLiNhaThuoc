const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserModel = require('../../models/userModel/user');
const RoleModel = require('../../models/roleModel/role');
const sendMail = require('../../helpers/sendMail');
const generateRandomCode = require('../../helpers/randomCode');

const Auth = {
    Register: async (req, res) => {
        const { fullname, email, password, phone } = req.body;
        try {
            if (!fullname || !email || !password) {
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
                randomCode: `
                 <h1>Xác nhận tài khoản của bạn</h1>
                 <p>Chào bạn,</p>
                 <p>Vui lòng nhập mã xác nhận sau vào ứng dụng của bạn để xác thực tài khoản:</p>
                 <p class="code">${randomCode}</p>
                 <p class="footer">Nếu bạn không yêu cầu đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
                `
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
                { expiresIn: '10s' }
            );

            const refreshToken = jwt.sign(
                { userId: findUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            );
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                sameSite: 'Strict',
                path: '/',
            })
            console.log('Cookies after setting:', req.cookies.refreshToken);
            res.json({
                message: "Đăng nhập thành công",
                accessToken
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    LoginGoogle: async (req, res) => {
        const { fullname, email, googleId, avatar, emailVerify } = req.body;
        try {
            const role = await RoleModel.findOne({ role_Name: "customer" });
            if (!role) {
                return res.status(500).json({ message: 'Role không tồn tại trong hệ thống.' });
            }

            let user = await UserModel.findOne({ email });

            if (!user) {
                user = new UserModel({
                    fullname,
                    email,
                    googleId,
                    avatar,
                    provider: 'google',
                    emailVerify,
                    is_active: 1,
                    role_id: role._id,
                });
                await user.save();
            } else {
                if (!user.emailVerify && emailVerify) {
                    user.emailVerify = true;
                    await user.save();
                }
            }
            res.status(200).json({ user, message: 'Đăng nhập Google thành công!' });
        } catch (error) {
            console.error('Lỗi khi đăng nhập Google:', error);
            res.status(500).json({ message: error.message });
        }
    },
    RefreshToken: async (req, res) => {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token không tồn tại' });
        }
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const newAccessToken = jwt.sign(
                { userId: payload.userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi xác thực refresh token' });
        }
    },
    Logout: async (req, res) => {
        try {          
            res.clearCookie('refreshToken', { 
                path: '/',
                httpOnly: true,
                sameSite: 'Strict',
             });
            res.status(200).json({ message: 'Đăng xuất thành công' });

        } catch (error) {
            res.status(500).json({ message: 'Lỗi xác thực refresh token' });
        }
    },
    VerifyCode: async (req, res) => {
        try {
            const { email, code } = req.body;
            const user = await UserModel.findOne({ email });

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
    SendCodeForgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Tài khoản chưa đăng ký không thể quên mật khẩu" });
            }

            const codeForgotPassword = generateRandomCode(6);
            const timeOtp = new Date(Date.now() + 1 * 60 * 1000);

            user.otpForgotPass = codeForgotPassword;
            user.timeOtp = timeOtp;
            await user.save();

            await sendMail({
                email: user.email,
                subject: "Đặt lại mật khẩu của bạn",
                randomCode: `
                 <h1>Đặt lại mật khẩu của bạn</h1>
                 <p>Chào bạn,</p>
                 <p>Vui lòng nhập mã xác nhận sau vào ứng dụng của bạn để thay đổi mật khẩu:</p>
                 <p class="code">${codeForgotPassword}</p>
                 <p class="footer">Nếu bạn không yêu cầu đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
         `
            });
            res.status(200).json({ message: "Vui lòng kiểm tra email", codeForgotPassword });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    ForgotPassword: async (req, res) => {
        try {
            const { email, newPassword, code } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Tài khoản chưa đăng ký không thể quên mật khẩu" });
            }
            if (code !== user.otpForgotPass) {
                return res.status(400).json({ message: "Mã để thay đổi mật khẩu không chính xác" })
            }
            if (Date.now() > user.timeOtp) {
                return res.status(400).json({ message: "Mã xác nhận đã hết hạn, vui lòng gửi lại" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            user.otpForgotPass = undefined;
            user.timeOtp = undefined;
            await user.save();
            res.status(200).json({ message: "Đổi mật khẩu thành công" });
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
    ResendVerifyCode: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ email });
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
                randomCode: `
                 <h1>Mã mới được cung cấp</h1>
                 <p>Chào bạn,</p>
                 <p>Vui lòng nhập mã mới vừa cung cấp để xác thực tài khoản của bạn:</p>
                 <p class="code">${newVerificationCode}</p>
                 <p class="footer">Nếu bạn không yêu cầu đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
                `
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