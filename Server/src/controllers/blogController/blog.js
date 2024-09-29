const Blog = require('../../models/blogModel/blog');

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const allBlogs = await Blog.find();
      if (!allBlogs) {
        return res.status(404).json('Không lấy được dữ liệu');
      }
      res.status(200).json(allBlogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addBlog: async (req, res) => {
    try {
      const { title, image, description, content, user_id } = req.body;
      if (!title || !image || !description || !user_id || content) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
      }
      const newBlog = new Blog({ title, image, description, user_id, content });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteBlog = await Blog.findByIdAndDelete(id);
      if (!deleteBlog) {
        return res.status(404).json({ message: 'Không tìm thấy blog để xóa' });
      }
      res.status(200).json({ message: 'Blog đã được xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, image, description, user_id, content } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, image, description, user_id, content },
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Không tìm thấy blog để cập nhật' });
      }
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = blogController;
