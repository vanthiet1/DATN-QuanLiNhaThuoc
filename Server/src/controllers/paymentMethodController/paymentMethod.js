const PaymentMethodModel = require('../../models/paymentMethodModel/paymentMethod');

const paymentMethodController = {
  createPaymentMethod: async (req, res) => {
    try {
      const { name, image } = req.body;

      if (!name || !image) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
      }

      const newPaymentMethod = new PaymentMethodModel({ name, image });
      await newPaymentMethod.save();

      res.status(201).json({ message: 'Đã thêm payment method thành công', newPaymentMethod });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPaymentMethod: async (req, res) => {
    try {
      const paymentMethod = await PaymentMethodModel.find({});
      res.status(200).json(paymentMethod);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePaymentMethod: async (req, res) => {
    const { id } = req.params;
    try {
      const deletePaymentMethod = await PaymentMethodModel.findByIdAndDelete(id);

      if (!deletePaymentMethod) {
        return res.status(404).json({ message: 'Không tìm thấy payment method để xóa' });
      }

      res.status(200).json({ message: 'payment method đã xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePaymentMethod: async (req, res) => {
    const { id } = req.params;
    const { name, url_img } = req.body;

    try {
      const updatePaymentMethod = await PaymentMethodModel.findByIdAndUpdate(id, { name, url_img }, { new: true });

      if (!updatePaymentMethod) {
        return res.status(404).json({ message: 'Không tìm thấy payment method' });
      }

      res.status(200).json({ message: 'Đã cập nhật payment method thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = paymentMethodController;
