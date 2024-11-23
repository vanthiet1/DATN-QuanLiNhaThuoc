const BannerModel = require('../../models/bannerModel/banner');
const { handleCreateImageUpload } = require('../../services/mediaCloudinary');
const formatHelper = require('../../utilities/helper/formatHelper');

const bannerController = {
  createBanner: async (req, res) => {
    try {
      const { name } = req.body;
      const imgFile = req.file;

      if (!name || !imgFile) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
      }

      let urlCloundCreated = '';

      if (imgFile) {
        const b64 = Buffer.from(imgFile.buffer).toString('base64');
        let dataURI = 'data:' + imgFile.mimetype + ';base64,' + b64;

        const imageName = imgFile.originalname.split('.')[0];
        const urlOptions = {
          folder: 'nhathuoc/banners',
          public_id: formatHelper.converStringToSlug(imageName)
        };
        const secure_url = await handleCreateImageUpload(dataURI, urlOptions);
        urlCloundCreated = secure_url;
        console.log(urlCloundCreated);
      }

      if (urlCloundCreated) {
        const newBanner = new BannerModel({ name, url_img: urlCloundCreated });
        await newBanner.save();

        res.status(201).json({ message: 'Đã thêm banner thành công', newBanner });
      }
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

  getBannerById: async (req, res) => {
    const { id } = req.params;
    try {
      const getOneBanner = await BannerModel.findById(id);

      if (!getOneBanner) {
        return res.status(404).json({ message: 'Không tìm thấy banner' });
      }

      res.status(200).json( getOneBanner);
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
    try {
      const { id } = req.params;
      const { name, url_img } = req.body;
      const imgFile = req.file;

      let urlCloundCreated = '';

      if (imgFile) {
        const b64 = Buffer.from(imgFile.buffer).toString('base64');
        let dataURI = 'data:' + imgFile.mimetype + ';base64,' + b64;

        const imageName = imgFile.originalname.split('.')[0];
        const urlOptions = {
          folder: 'nhathuoc/banners',
          public_id: formatHelper.converStringToSlug(imageName)
        };
        const secure_url = await handleCreateImageUpload(dataURI, urlOptions);
        urlCloundCreated = secure_url;
        console.log(urlCloundCreated);
      }

      const updatedBanner = await BannerModel.findByIdAndUpdate(id, { name, url_img: urlCloundCreated }, { new: true });

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
