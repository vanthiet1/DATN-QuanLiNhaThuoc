const CouponModel = require('../../models/couponModel/coupon');
const OrderModel = require('../../models/ordersModels/order');

const CouponController = {
  createCoupon: async (req, res) => {
    const { code, is_active, discount_value, start_date, end_date } = req.body;

    const existingCoupon = await CouponModel.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: 'Mã giảm giá đã tồn tại!' });
    }

    if (start_date > end_date) {
      return res.status(400).json({ message: 'Ngày bắt đầu không thể lớn hơn ngày kết thúc.' });
    }
    const currentDate = new Date(new Date().toISOString().split('T')[0]);
    if (new Date(start_date) < currentDate || new Date(end_date) < currentDate) {
      return res.status(400).json({ message: 'Ngày bắt đầu hoặc ngày kết thúc không thể nhỏ hơn ngày hiện tại.' });
    }
    if (discount_value < 5000 || discount_value > 50000) {
      return res.status(400).json({ message: 'Giá trị mã giảm giá phải nằm trong khoảng từ 5000 đến 50000.' });
    }

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
        message: 'Mã giảm giá mới đã được tạo thành công.',
        coupon: newCoupon
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tạo mã giảm giá: ' + error.message });
    }
  },

  getCoupons: async (req, res) => {
    try {
      const coupons = await CouponModel.find();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách mã giảm giá: ' + error.message });
    }
  },

  getCouponsActive: async (req, res) => {
    try {
      const coupons = await CouponModel.find({ is_active: true });
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách mã giảm giá: ' + error.message });
    }
  },

  getCouponById: async (req, res) => {
    try {
      const { id } = req.params;
      const coupon = await CouponModel.findById(id);
      if (!coupon) {
        return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
      }
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy mã giảm giá: ' + error.message });
    }
  },

  updateCoupon: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, is_active, discount_value, start_date, end_date } = req.body;

      const existingCoupon = await CouponModel.findOne({ code, _id: { $ne: id } });
      if (existingCoupon) {
        return res.status(400).json({ message: 'Mã giảm giá đã tồn tại với ID khác.' });
      }
      if (start_date > end_date) {
        return res.status(400).json({ message: 'Ngày bắt đầu không thể lớn hơn ngày kết thúc.' });
      }
      if (discount_value < 5000 || discount_value > 50000) {
        return res.status(400).json({ message: 'Giá trị mã giảm giá phải nằm trong khoảng từ 5000 đến 50000.' });
      }
      const currentDate = new Date(new Date().toISOString().split('T')[0]);
      if (new Date(start_date) < currentDate || new Date(end_date) < currentDate) {
        return res.status(400).json({ message: 'Ngày bắt đầu hoặc ngày kết thúc không thể nhỏ hơn ngày hiện tại.' });
      }

      const updatedCoupon = await CouponModel.findByIdAndUpdate(
        id,
        { code, is_active, discount_value, start_date, end_date },
        { new: true }
      );
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
      }
      res.status(200).json({
        message: 'Mã giảm giá đã được cập nhật thành công.',
        coupon: updatedCoupon
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi cập nhật mã giảm giá: ' + error.message });
    }
  },

  deleteCoupon: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCoupon = await CouponModel.findByIdAndDelete(id);
      if (!deletedCoupon) {
        return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
      }
      res.status(200).json(deletedCoupon);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa mã giảm giá: ' + error.message });
    }
  }
};

module.exports = CouponController;
