const BrandModel = require('../../models/brandModel/brand');

const brandController = {
  createBrand: async (req, res) => {
    try {
      const { name, origin_country, country_made } = req.body;

      const hasNumber = /\d/;
      if (hasNumber.test(origin_country) || hasNumber.test(country_made)) {
        return res.status(400).json({ message: 'Tên quốc gia không được chứa số!' });
      }

      const existingBrand = await BrandModel.findOne({ name });
      if (existingBrand) {
        return res.status(400).json({ message: 'Tên thương hiệu đã tồn tại!' });
      }

      const newBanner = new BrandModel({ name, origin_country, country_made });
      await newBanner.save();

      res.status(201).json({ message: 'Tạo thương hiệu thành công', data: newBanner });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBrand: async (req, res) => {
    try {
      const brand = await BrandModel.find({});
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getDetailBrand: async (req, res) => {
    try {
      const { id } = req.params;
      const detailBrand = await BrandModel.findById(id);
      res.status(200).json(detailBrand);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBrand: async (req, res) => {
    const { id } = req.params;

    try {
      const brandExistInProduct = await ProductsModel.find({ brand_id: id });
      if (brandExistInProduct.length > 0) {
        return res.status(404).json({ message: 'Không thể xóa khi brand id vẫn tồn tại trong product' });
      }

      const deleteBrand = await BrandModel.findByIdAndDelete(id);

      if (!deleteBrand) {
        return res.status(404).json({ message: 'Không tìm thấy thương hiệu.' });
      }

      res.status(200).json({ message: 'Xóa thành công', data: deleteBrand });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBrand: async (req, res) => {
    const { id } = req.params;
    const { name, origin_country, country_made } = req.body;
    const hasNumber = /\d/;

    if ((origin_country && hasNumber.test(origin_country)) || (country_made && hasNumber.test(country_made))) {
      return res.status(400).json({ message: 'Tên quốc gia không được chứa số!' });
    }

    try {
      const existingBrand = await BrandModel.findOne({ name, _id: { $ne: id } });
      if (existingBrand) {
        return res.status(400).json({ message: 'Tên thương hiệu đã tồn tại!' });
      }
      const updateBrand = await BrandModel.findByIdAndUpdate(id, { name, origin_country, country_made }, { new: true });

      if (!updateBrand) {
        return res.status(404).json({ message: 'Thương hiệu không tồn tại' });
      }

      res.status(200).json({ message: 'Cập nhật thành công', data: updateBrand });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = brandController;
