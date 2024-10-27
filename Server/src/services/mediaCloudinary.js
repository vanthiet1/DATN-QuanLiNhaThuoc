const cloudinary = require('../configs/mediaUpload');

const handleCreateImageUpload = async (pathImage, options = {}) => {
  try {
    const optionsDefault = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'image',
      folder: 'nhathuoc',
      ...options
    };
    const result = await cloudinary.uploader.upload(pathImage, optionsDefault);
    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteImageUpload = async (pathImage) => {
  try {
    const result = await cloudinary.uploader.destroy(pathImage);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleCreateImageUpload,
  handleDeleteImageUpload
};
