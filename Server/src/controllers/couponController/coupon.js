const CouponModel = require('../../models/couponModel/coupon');

const CouponController = {
  createCoupon: async (req, res) => {
    const { code, is_active, discount_value, start_date, end_date } = req.body;
    try {
      const newCoupon = new CouponModel({
        code,
        is_active,
        discount_value,
        start_date,
        end_date
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

  getCoupons: async (req, res) => {
    try {
      const coupons = await CouponModel.find();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách coupon: ' + error.message });
    }
  },

  getCouponsActive: async (req, res) => {
    try {
      const coupons = await CouponModel.find({ is_active: true });
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách coupon: ' + error.message });
    }
  },

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

  updateCoupon: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, is_active, discount_value, start_date, end_date } = req.body;

      const updatedCoupon = await CouponModel.findByIdAndUpdate(
        id,
        { code, is_active, discount_value, start_date, end_date },
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
