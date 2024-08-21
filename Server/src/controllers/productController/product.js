const ProductModel = require('../../models/productModel/product');
const formatHelper = require('../../utilities/helper/formatHelper');

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const { imageArr, ...product } = req.body;
      const slug = formatHelper.converStringToSlug(product.name);
      const newProduct = new ProductModel({ ...product, slug });
      // if (imageArr.length > 0 && Array.isArray(imageArr)) {

      // } else {
      //   return res.status(404).json({
      //     message: 'Bạn chưa thêm hình ảnh cho sản phẩm.'
      //   });
      // }
      await newProduct.save();
      res.status(201).json({
        message: 'Product mới đã được tạo thành công.',
        product: newProduct
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tạo product: ' + error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const productsList = await ProductModel.find({});
      if (productsList) {
        res.status(200).json(productsList);
      }
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách role: ' + error.message });
    }
  },
  getListProductBestSeller: async (req, res) => {
    try {
      const listIDProductBestOrder = ['66c5de99a9cc4cab134d28f5', '66c5defaa9cc4cab134d28f7'];
      if (listIDProductBestOrder.length <= 12) {
        const productsList = await ProductModel.find({}).limit(12);
        return res.status(200).json(productsList);
      }
      const productsList = await ProductModel.find({
        _id: { $in: listIDProductBestOrder }
      }).limit(12);
      return res.status(200).json(productsList);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm bán chạy nhất: ' + error.message });
    }
  },
  // Lấy thông tin Role theo ID
  getRoleById: async (req, res) => {
    try {
      const { id } = req.params;
      const role = await RoleModel.findById(id);
      if (!role) {
        return res.status(404).json({ message: 'Không tìm thấy role' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy role: ' + error.message });
    }
  },

  // Cập nhật Role theo ID
  updateRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role_Name } = req.body;

      const updatedRole = await RoleModel.findByIdAndUpdate(id, { role_Name }, { new: true });
      if (!updatedRole) {
        return res.status(404).json({ message: 'Không tìm thấy role' });
      }
      res.status(200).json({
        message: 'Role đã được cập nhật thành công.',
        role: updatedRole
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi cập nhật role: ' + error.message });
    }
  },

  // Xóa Role theo ID
  deleteRole: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRole = await RoleModel.findByIdAndDelete(id);
      if (!deletedRole) {
        return res.status(404).json({ message: 'Không tìm thấy role' });
      }
      res.status(200).json({ message: 'Role đã bị xóa' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa role: ' + error.message });
    }
  }
};

module.exports = ProductController;
