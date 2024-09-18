const SubCategoryModel = require('../../models/subCategoryModel/subCategory');

const subCategory = {
  addSubCategory: async (req, res) => {
    const { name, category_id, description } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ message: 'Tên và category_id là bắt buộc.' });
    }

    try {
      const subCategory = new SubCategoryModel({
        name,
        category_id,
        description: description || ''
      });

      await SubCategoryModel.save();

      res.status(201).json({ message: 'Danh mục con đã được tạo thành công', data: subCategory });
    } catch (error) {
      console.error('Lỗi khi thêm danh mục con:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm danh mục con', error: error.message });
    }
  },

  deleteSubCategory: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Cần phải có ID để xóa.' });
    }

    try {
      const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);

      if (!deletedSubCategory) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục con.' });
      }

      res.status(200).json({ message: 'Đã xóa thành công danh mục con', data: deletedSubCategory });
    } catch (error) {
      console.error('Lỗi khi xóa danh mục con:', error);

      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa danh mục con', error: error.message });
    }
  },

  getSubCategory: async (req, res) => {
    try {
      const subCategories = await SubCategoryModel.find({}).populate('category_id', 'name');
      res.status(200).json({ data: subCategories });
    } catch (error) {
      console.error('Lỗi khi tải các danh mục con:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi tải các danh mục con', error: error.message });
    }
  },

  updateSubCategory: async (req, res) => {
    const { id } = req.params;
    const { name, category_id, description } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ message: 'Tên và category_id là bắt buộc.' });
    }

    try {
      const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
        id,
        { name, category_id, description: description || '' },
        { new: true }
      );

      if (!updatedSubCategory) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục con.' });
      }

      res.status(200).json({ message: 'Danh mục con đã được cập nhật thành công', data: updatedSubCategory });
    } catch (error) {
      console.error('Lỗi khi cập nhật danh mục con:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật danh mục con', error: error.message });
    }
  }
};

module.exports = subCategory;
