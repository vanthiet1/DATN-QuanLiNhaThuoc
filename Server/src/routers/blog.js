const router = require("express").Router();
const blogController = require('../controllers/blogController/blog');

router.post("/:id", blogController.addBlog);;
router.put('/edit/:id', blogController.updateBlog);
router.get("/comments", blogController.getAllBlogs);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;