const Router = require('express').Router()
const bannerController = require('../controllers/bannerController/banner');


Router.post('/create', bannerController.createBanner);
Router.get('/', bannerController.getBanners);
Router.delete('/:id', bannerController.deleteBanner);
Router.put('/:id', bannerController.updateBanner);

module.exports = Router;
