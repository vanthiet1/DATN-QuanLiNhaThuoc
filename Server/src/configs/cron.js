const cron = require('node-cron');
const UserModel = require('../models/userModel/user'); 
require('dotenv').config()
const sendReminderEmail = require('../helpers/notification')
const { reminderEmailSchedule , clearOtpSchedule} = require('./cronConfig');
const cronCofig = {
     clearOTP: ()=>{
        cron.schedule(clearOtpSchedule, async () => {
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
     },
     sendReminderEmail: () => {
        cron.schedule(reminderEmailSchedule, async () => { 
            try {
                // const users = await UserModel.find(); 
                // if (users.length === 0) {
                //     return;
                // }
                // for (const user of users) {
                //     const email = user.email;
                //     const subject = 'Nhắc nhở uống thuốc';
                //     const htmlContent = `
                //         <h1>Nhắc nhở uống thuốc</h1>
                //         <p>Lưu ý: Đây là nhắc nhở uống thuốc hàng ngày của bạn!</p>
                //          <a href="http://localhost:5173/">Ghé thăm website của chúng tôi
                //          </a>
                //     `;
                //     if (email) {
                //         await sendReminderEmail({ email, subject, htmlContent });
                //     } else {
                //         console.log(`Người dùng ${user.username} không có email hợp lệ.`);
                //     }
                // }
                // const users = await UserModel.find(); 
                // if (users.length === 0) {
                //     return;
                // }
                    const email = 'vanthietfrontend@gmail.com';
                    const subject = 'Nhắc nhở uống thuốc';
                    const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Nhắc nhở uống thuốc</h1>
    </div>
    <div style="padding: 20px; text-align: center;">
        <img src="cid:logo" alt="Logo" style="width: 100px; margin-bottom: 20px;">
        <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
            Lưu ý: Đây là nhắc nhở uống thuốc hàng ngày của bạn! Đừng quên uống thuốc đúng giờ để đảm bảo sức khỏe.
        </p>
        <a href="http://localhost:5173/" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px;">
            Ghé thăm website của chúng tôi
        </a>
    </div>
    <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #777777; font-size: 12px;">
        <p style="margin: 0;">&copy; 2024 Công ty của bạn. Mọi quyền được bảo lưu.</p>
    </div>
</div>

                    `;
                    if (email) {
                        await sendReminderEmail({ email, subject, htmlContent });
                    } else {
                        console.log(`Người dùng ${user.username} không có email hợp lệ.`);
                    }
            } catch (error) {
                console.log({message: error.message});
            }
        });
    }
}
module.exports = cronCofig
