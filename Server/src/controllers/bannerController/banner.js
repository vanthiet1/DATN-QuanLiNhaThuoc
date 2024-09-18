const BannerModel = require('../../models/bannerModel/banner');

const bannerController = {
  createBanner: async (req, res) => {
    try {
      const { name, url_img } = req.body;

      if (!name || !url_img) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
      }

      const newBanner = new BannerModel({ name, url_img });

      await newBanner.save();

      res.status(201).json({ message: 'Đã thêm banner thành công',  newBanner });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBanners: async (req, res) => {
    try {
      const banners = await BannerModel.find({});
      res.status(200).json(banners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBanner: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBanner = await BannerModel.findByIdAndDelete(id);

      if (!deletedBanner) {
        return res.status(404).json({ message: 'Không tìm thấy banner để xóa' });
      }

      res.status(200).json({ message: 'Banner đã xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBanner: async (req, res) => {
    const { id } = req.params;
    const { name, url_img } = req.body;

    try {
      const updatedBanner = await BannerModel.findByIdAndUpdate(id, { name, url_img }, { new: true });

      if (!updatedBanner) {
        return res.status(404).json({ message: 'Không tìm thấy banner' });
      }

      res.status(200).json({ message: 'Đã cập nhật banner thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = bannerController;
