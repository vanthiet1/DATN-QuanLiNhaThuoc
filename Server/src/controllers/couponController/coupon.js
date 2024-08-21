const CouponModel = require('../../models/couponModel/coupon');

const CouponController = {
    // Tạo mới Coupon
    createCoupon: async (req, res) => {
        const { code, is_active, discount_value } = req.body;
        try {
            const newCoupon = new CouponModel({
                code,
                is_active,
                discount_value
            });
            await newCoupon.save();
            res.status(201).json({
                message: 'Coupon mới đã được tạo thành công.',
                coupon: newCoupon
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo coupon: ' + error.message });
        }
    },

    // Lấy danh sách các Coupon
    getCoupons: async (req, res) => {
        try {
            const coupons = await CouponModel.find();
            res.status(200).json(coupons);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách coupon: ' + error.message });
        }
    },

    // Lấy thông tin Coupon theo ID
    getCouponById: async (req, res) => {
        try {
            const { id } = req.params;
            const coupon = await CouponModel.findById(id);
            if (!coupon) {
                return res.status(404).json({ message: 'Không tìm thấy coupon' });
            }
            res.status(200).json(coupon);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy coupon: ' + error.message });
        }
    },

    // Cập nhật Coupon theo ID
    updateCoupon: async (req, res) => {
        try {
            const { id } = req.params;
            const { code, is_active, discount_value } = req.body;

            const updatedCoupon = await CouponModel.findByIdAndUpdate(
                id,
                { code, is_active, discount_value },
                { new: true }
            );
            if (!updatedCoupon) {
                return res.status(404).json({ message: 'Không tìm thấy coupon' });
            }
            res.status(200).json({
                message: 'Coupon đã được cập nhật thành công.',
                coupon: updatedCoupon
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật coupon: ' + error.message });
        }
    },

    // Xóa Coupon theo ID
    deleteCoupon: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCoupon = await CouponModel.findByIdAndDelete(id);
            if (!deletedCoupon) {
                return res.status(404).json({ message: 'Không tìm thấy coupon' });
            }
            res.status(200).json({ message: 'Coupon đã bị xóa' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa coupon: ' + error.message });
        }
    }
};

module.exports = CouponController;
