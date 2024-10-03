const cron = require('node-cron');
const UserModel = require('../models/userModel/user'); 

cron.schedule('* * * * *', async () => {
    try {
        const expiredUsers = await UserModel.find({
            timeOtp: { $lt: Date.now() }  
        });

        if (expiredUsers.length > 0) {
            for (const user of expiredUsers) {
                user.otpVerify = undefined;
                user.timeOtp = undefined;
                user.otpForgotPass = undefined;
                user.lastOtpRequestTime = undefined; // để kiểm tra spam
                await user.save(); 
                console.log(`Đã xóa OTP của người dùng: ${user.email}`);
            }
        }
    } catch (error) {
        console.error('Lỗi khi kiểm tra OTP hết hạn:', error);
    }
});
