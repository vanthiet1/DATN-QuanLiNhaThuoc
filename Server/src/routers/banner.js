const Router = require('express').Router();
const bannerController = require('../controllers/bannerController/banner');
const upload = require('../middlewares/uploadMiddleware');

Router.post('/create', upload.single('bannerImg'), bannerController.createBanner);
Router.get('/', bannerController.getBanners);
Router.delete('/:id', bannerController.deleteBanner);
Router.put('/:id', upload.single('bannerImg'), bannerController.updateBanner);

module.exports = Router;
