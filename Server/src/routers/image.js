const express = require('express');
const router = express.Router();
const {
  createImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage
} = require('../controllers/imageController/image');

router.post('/create', createImage);
router.get('/', getImages);
router.get('/detail/:id', getImageById);
router.put('/edit/:id', updateImage);
router.delete('/delete/:id', deleteImage);

module.exports = router;
