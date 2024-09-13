const Router = require('express').Router();
const ImageController = require('../controllers/imageController/image');

Router.post('/create', ImageController.createImage);
Router.get('/', ImageController.getImages);
Router.get('/detail/:id', ImageController.getImageById);
Router.put('/edit/:id', ImageController.updateImage);
Router.delete('/delete/:id', ImageController.deleteImage);

module.exports = Router;
