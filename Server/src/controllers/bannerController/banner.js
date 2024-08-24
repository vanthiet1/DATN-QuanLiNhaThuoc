const BannerModel = require('../../models/bannerModel/banner');

const bannerController = {
  createBanner: async (req, res) => {
    try {
      const { name, url_img } = req.body;

      if (!name || !url_img) {
        return res.status(400).json({ message: 'Name and URL image are required.' });
      }

      const newBanner = new BannerModel({ name, url_img });

      await newBanner.save();

      res.status(201).json({ message: 'Banner created successfully', data: newBanner });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBanners: async (req, res) => {
    try {
      const banners = await BannerModel.find({});
      res.status(200).json({ data: banners });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBanner: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedBanner = await BannerModel.findByIdAndDelete(id);

      if (!deletedBanner) {
        return res.status(404).json({ message: 'Banner not found.' });
      }

      res.status(200).json({ message: 'Banner deleted successfully', data: deletedBanner });
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
        return res.status(404).json({ message: 'Banner not found.' });
      }

      res.status(200).json({ message: 'Banner updated successfully', data: updatedBanner });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = bannerController;
