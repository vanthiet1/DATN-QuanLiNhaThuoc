const Blog = require('../../models/blogModel/blog');

const blogController = {
    getAllBlogs: async (req, res) => {
        try {
            const allBlogs = await Blog.find().populate('user_id', 'username email');
            if (!allBlogs) {
                return res.status(404).json("Không lấy được dữ liệu");
            }
            res.status(200).json(allBlogs);
        } catch (error) {
            res.status(500).json({ message: "Lỗi" });
        }
    },
    addBlog: async (req, res) => {
        try {
            const { title, image, description, user_id } = req.body;
            if (!title || !image || !description || !user_id) {
                return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
            }
            const newBlog = new Blog({ title, image, description, user_id });
            await newBlog.save();
            res.status(201).json(newBlog);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" });
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
            res.status(500).json({ message: "Lỗi server" });
        }
    },
    updateBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, image, description, user_id } = req.body;
            const updatedBlog = await Blog.findByIdAndUpdate(id, { title, image, description, user_id }, { new: true });
            if (!updatedBlog) {
                return res.status(404).json({ message: 'Không tìm thấy blog để cập nhật' });
            }
            res.status(200).json(updatedBlog);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" });
        }
    }
}

module.exports = blogController;
