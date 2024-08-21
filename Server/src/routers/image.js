const express = require('express');
const router = express.Router();
const {
  createImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage
} = require('../controllers/imageController/image');

router.post('/image/add', createImage);
router.get('/images', getImages);
router.get('/images/:id', getImageById);
router.put('/images/:id', updateImage);
router.delete('/images/:id', deleteImage);

module.exports = router;
