const PharmacyModel = require('../../models/pharmacyModel/pharmacyModel');

const PharmacyController = {
  createPharmacy: async (req, res) => {
    try {
      const { name, address, latitude, longitude, phone_number, opening_hours } = req.body;

      if (!name || !address || !latitude || !longitude || !phone_number || !opening_hours) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
      }

      const newPharmacy = new PharmacyModel({ name, address, latitude, longitude, phone_number, opening_hours });
      await newPharmacy.save();

      res.status(201).json({ message: 'Đã thêm payment method thành công', newPharmacy });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPharmacy: async (req, res) => {
    try {
      const Pharmacy = await PharmacyModel.find({});
      res.status(200).json(Pharmacy);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePharmacy: async (req, res) => {
    const { id } = req.params;
    try {
      const deletePharmacy = await PharmacyModel.findByIdAndDelete(id);

      if (!deletePharmacy) {
        return res.status(404).json({ message: 'Không tìm thấy payment method để xóa' });
      }

      res.status(200).json({ message: 'payment method đã xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePharmacy: async (req, res) => {
    const { id } = req.params;
    const { name, address, latitude, longitude, phone_number, opening_hours } = req.body;

    try {
      const updatePharmacy = await PharmacyModel.findByIdAndUpdate(
        id,
        { name, address, latitude, longitude, phone_number, opening_hours },
        { new: true }
      );

      if (!updatePharmacy) {
        return res.status(404).json({ message: 'Không tìm thấy payment method' });
      }

      res.status(200).json({ message: 'Đã cập nhật payment method thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = PharmacyController;
