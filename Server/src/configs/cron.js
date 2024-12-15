const cron = require('node-cron');
const UserModel = require('../models/userModel/user');
const OrderModel = require('../models/ordersModels/order');
const CouponModel = require('../models/couponModel/coupon');
require('dotenv').config()
const sendReminderEmail = require('../helpers/notification')
const { reminderEmailSchedule, clearOtpSchedule , clearIsActive} = require('./cronConfig');
const cronCofig = {
    clearOTP: () => {
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
                        user.lastOtpRequestTime = undefined; // check spam
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
                const users = await UserModel.find();

                if (users.length === 0) {
                    return;
                }
                for (const user of users) {
                   const orders = await OrderModel.find({user_id:user._id});
                   if (!orders.length) {
                    continue;
                     }
                    const email = user.email;
                    const subject = 'Nhắc nhở uống thuốc';
                    const htmlContent = `

                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div style="background-color: #2563EB; padding: 20px; text-align: center;">
                                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Nhắc nhở uống thuốc</h1>
                            </div>
                            <div style="padding: 20px; text-align: center;">
                                <img src="https://res.cloudinary.com/dz93cdipw/image/upload/v1733052072/DATN_QuanLiNhaThuoc/lfriluyngwydd2ri21ey.png" alt="Logo" style="width: 100px; margin-bottom: 20px;">
                                <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                                    Đây là nhắc nhở uống thuốc hàng ngày của bạn! Đừng quên uống thuốc đúng giờ để đảm bảo sức khỏe.
                                </p>
                                <a href="https://nha-thuoc-binh-an-duoc.vercel.app" style="display: inline-block; padding: 10px 20px; background-color: #2563EB; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px;">
                                    Ghé thăm website của chúng tôi
                                </a>
                            </div>
                            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #777777; font-size: 12px;">
                                <p style="margin: 0;">&copy; Bình An Dược</p>
                            </div>
                        </div>
                        <div style="padding: 20px; text-align: center;">
                            <img src="https://res.cloudinary.com/dz93cdipw/image/upload/v1733052072/DATN_QuanLiNhaThuoc/lfriluyngwydd2ri21ey.png" alt="Logo" style="width: 100px; margin-bottom: 20px;">
                            <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                                Đây là nhắc nhở uống thuốc hàng ngày của bạn! Đừng quên uống thuốc đúng giờ để đảm bảo sức khỏe.
                            </p>
                            <a href="https://nha-thuoc-binh-an-duoc.vercel.app" style="display: inline-block; padding: 10px 20px; background-color: #2563EB; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px;">
                                Ghé thăm website của chúng tôi
                            </a>
                        </div>
                        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #777777; font-size: 12px;">
                            <p style="margin: 0;">&copy; Bình An Dược</p>
                        </div>
                    </div>
                `;
                    if (email && orders) {
                        await sendReminderEmail({ email, subject, htmlContent });
                    } else {
                        console.log(`Người dùng ${user.username} không có email hợp lệ.`);
                    }
                }
            } catch (error) {
                console.log({ message: error.message });
            }
        });
    },
    clearCouponInactive: () => {
        cron.schedule(clearIsActive, async () => {
            try {
                const coupons = await CouponModel.find();
                const currentDate = new Date();  // Lấy thời gian hiện tại
    
                // Lặp qua tất cả các coupon
                for (const coupon of coupons) {
                    // Trường hợp coupon có trạng thái is_active = false và đã hết hạn, hoặc coupon có trạng thái is_active = true và đã hết hạn
                    if ((!coupon.is_active && new Date(coupon.end_date) < currentDate) || (coupon.is_active && new Date(coupon.end_date) < currentDate)) {
                        // Xóa coupon nếu thỏa mãn các điều kiện trên
                        const deleteCoupon = await CouponModel.findByIdAndDelete(coupon._id);
                        console.log('Đã xóa coupon:', deleteCoupon);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
}
module.exports = cronCofig
