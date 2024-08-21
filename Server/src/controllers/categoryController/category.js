const CategoryModel = require('../../models/categoryModel/category');

const categoryController = {
  addCategory: async (req, res) => {
    const { name, description, position } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Cần phải nhập tên và mô tả.' });
    }

    try {
      const category = new CategoryModel({
        name,
        description,
        position
      });
      await category.save();

      res.status(201).json({ message: 'Danh mục đã được tạo thành công', data: category });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Cần phải có ID để xóa danh mục.' });
    }

    try {
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found.' });
      }

      res.status(200).json({ message: 'Không tìm thấy danh mục.', data: deletedCategory });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const categories = await CategoryModel.aggregate([
        {
          $lookup: {
            from: 'subcategories',
            localField: '_id',
            foreignField: 'category_id',
            as: 'subcategories'
          }
        }
      ]);
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { name, description, position } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Cần phải nhập tên và mô tả.' });
    }

    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(id, { name, description, position }, { new: true });

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
      }

      res.status(200).json({ message: 'Đã cập nhật danh mục thành công', data: updatedCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = categoryController;
