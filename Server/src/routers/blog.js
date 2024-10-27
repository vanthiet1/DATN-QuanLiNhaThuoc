const Router = require('express').Router();
const blogController = require('../controllers/blogController/blog');


Router.post("/", blogController.addBlog);
Router.put("/:id", blogController.updateBlog);
Router.get("/", blogController.getAllBlogs);
Router.delete("/:id", blogController.deleteBlog);

module.exports = Router;