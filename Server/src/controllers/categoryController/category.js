const mongoose = require('mongoose');
const CategoryModel = require('../../models/categoryModel/category');
const ProductModel = require('../../models/productModel/product');
const ImageProduct = require('../../models/imageModels/image');
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
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getDetailCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const detailCategories = await CategoryModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: 'subcategories',
            localField: '_id',
            foreignField: 'category_id',
            as: 'subcategories'
          }
        }
      ]);

      if (!detailCategories || detailCategories.length === 0) {
        return res.status(404).json({ message: 'Danh mục không tồn tại' });
      }

      res.status(200).json({ detailCategories: detailCategories });
    } catch (error) {
      console.error('Error fetching category details:', error);
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
  },

   getProductWithCategory: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Không có id" });

    try {
        const categories = await CategoryModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'subcategories',
                    localField: '_id',
                    foreignField: 'category_id',
                    as: 'subcategories'
                }
            },
        ]);

        if (!categories || categories.length === 0) {
            return res.status(400).json({ message: "Không tìm thấy danh mục con" });
        }

        const subcategoryIds = categories[0].subcategories.map(subcategory => subcategory._id);

        const products = await ProductModel.find({ sub_category_id: { $in: subcategoryIds } });

        const productsWithImages = await Promise.all(products.map(async (product) => {
            const images = await ImageProduct.find({ product_id: product._id });
            return {
                ...product.toObject(), 
                images: images 
            };
        }));

        const filteredCategories = categories[0].subcategories.map(subcategory => {
            const productsForSubcategory = productsWithImages.filter(product => 
                product.sub_category_id && product.sub_category_id.toString() === subcategory._id.toString()
            );
            return {
                subcategoryId: subcategory._id,
                products: productsForSubcategory
            };
        });

        res.status(200).json(filteredCategories);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
};

module.exports = categoryController;
