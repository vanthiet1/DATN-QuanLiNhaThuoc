const Blog = require('../../models/blogModel/blog');
const { handleCreateImageUpload } = require('../../services/mediaCloudinary');
const formatHelper = require('../../utilities/helper/formatHelper');

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const allBlogs = await Blog.find().sort({ createdAt: 1 }).populate('user_id', 'fullname email avatar');
      if (!allBlogs) {
        return res.status(404).json('Không lấy được dữ liệu');
      }
      res.status(200).json(allBlogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneBlog: async (req, res) => {
    const { id } = req.params;
    try {
      const oneBlog = await Blog.findById(id).populate('user_id', 'fullname email avatar');
      if (!oneBlog) {
        return res.status(404).json('Không lấy được dữ liệu');
      }
      res.status(200).json(oneBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addBlog: async (req, res) => {
    try {
      const { title, description, content, user_id } = req.body;
      const image = req.file;

      if (!title || !image || !description || !user_id) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
      }

      let urlCloundCreated = '';

      if (image) {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64;

        const imageName = image.originalname.split('.')[0];
        const urlOptions = {
          folder: 'nhathuoc/blogAvatar',
          public_id: formatHelper.converStringToSlug(imageName)
        };
        const secure_url = await handleCreateImageUpload(dataURI, urlOptions);
        urlCloundCreated = secure_url;
        console.log(urlCloundCreated);
      }
      if (urlCloundCreated) {
        const newBlog = new Blog({ title, image: urlCloundCreated, description, user_id, content });
        await newBlog.save();
        res.status(201).json(newBlog);
      }
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
      const { title, description, user_id, content } = req.body;
      let urlCloundCreated = '';

      if (req.file) {
        const image = req.file;
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64;

        const imageName = image.originalname.split('.')[0];
        const urlOptions = {
          folder: 'nhathuoc/blogAvatar',
          public_id: formatHelper.converStringToSlug(imageName)
        };

        urlCloundCreated = await handleCreateImageUpload(dataURI, urlOptions);
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title,
          description,
          user_id,
          content,
          image: urlCloundCreated || req.body.image
        },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ message: 'Không tìm thấy blog để cập nhật' });
      }
      res.status(201).json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = blogController;
