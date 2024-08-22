const router = require("express").Router();
const blogController = require('../controllers/blogController/blog');


router.post("/", blogController.addBlog);
router.put("/:id", blogController.updateBlog);
router.get("/", blogController.getAllBlogs);
router.delete("/:id", blogController.deleteBlog);;

module.exports = router;