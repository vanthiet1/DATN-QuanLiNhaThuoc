const UserModel = require('../models/userModel/user')
const checkOtpExpiration = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
       
        if (user && Date.now() > user.timeOtp) {
            user.otpVerify = undefined;
            user.timeOtp = undefined;
            await user.save();
            console.log(`OTP của người dùng ${user.email} đã bị xóa do hết hạn`);
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi kiểm tra mã OTP" });
    }
};
module.exports = checkOtpExpiration