const Router = require('express').Router();
const {
  createImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage
} = require('../controllers/imageController/image');

Router.post('/create', createImage);
Router.get('/', getImages);
Router.get('/detail/:id', getImageById);
Router.put('/edit/:id', updateImage);
Router.delete('/delete/:id', deleteImage);

module.exports = Router;
