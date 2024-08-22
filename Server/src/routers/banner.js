const router = require("express").Router();
const bannerController = require('../controllers/bannerController/banner');

router.post("/", bannerController.addBanner);
router.get("/", bannerController.getAllBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;