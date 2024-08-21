const router = require("express").Router();
const bannerController = require('../controllers/bannerController/banner');

router.post("/:id", bannerController.addBanner);
router.get("/comments", bannerController.getAllBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;