const Router = require('express').Router();
const blogController = require('../controllers/blogController/blog');
const upload = require('../middlewares/uploadMiddleware');

Router.post("/", upload.single('image'), blogController.addBlog);
Router.put("/:id", upload.single('image'), blogController.updateBlog);
Router.get("/", blogController.getAllBlogs);
Router.get("/:id", blogController.getOneBlog);
Router.delete("/:id", blogController.deleteBlog);

module.exports = Router;