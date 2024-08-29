const BrandModel = require('../../models/brandModel/brand');

const brandController = {
  createBrand: async (req, res) => {
    try {
      const { name, origin_country, country_made } = req.body;

      if (!name || !origin_country || !country_made) {
        return res.status(400).json({ message: 'name,origin_country,country_made are required.' });
      }

      const newBanner = new BrandModel({ name, origin_country, country_made });
      await newBanner.save();

      res.status(201).json({ message: 'brand created successfully', data: newBanner });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBrand: async (req, res) => {
    try {
      const brand = await BrandModel.find({});
      res.status(200).json({ data: brand });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBrand: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteBrand = await BrandModel.findByIdAndDelete(id);

      if (!deleteBrand) {
        return res.status(404).json({ message: 'brand not found.' });
      }

      res.status(200).json({ message: 'brand deleted successfully', data: deleteBrand });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBrand: async (req, res) => {
    const { id } = req.params;
    try {
      const updateBrand = await BrandModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!updateBrand) {
        return res.status(404).json({ message: 'Banner not found.' });
      }

      res.status(200).json({ message: 'Banner updated successfully', data: updateBrand });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = brandController;
