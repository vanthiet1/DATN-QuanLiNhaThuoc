const ImagesModel = require('../../models/imageModels/image');
const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');
const ProductModel = require('../../models/productModel/product');
const { handleCreateImageUpload } = require('../../services/mediaCloudinary');
const formatHelper = require('../../utilities/helper/formatHelper');
const mongoose = require('mongoose');

const ProductController = {
  createProduct: async (req, res) => {
    try {
      if (!req.files) {
        return res.status(404).json({
          message: 'Bạn cần thêm hình ảnh khi tạo sản phẩm'
        });
      }
      const imgFiles = req.files;
      const urlCloundCreated = [];
      for (let i = 0; i < imgFiles.length; i++) {
        const b64 = Buffer.from(imgFiles[i].buffer).toString('base64');
        let dataURI = 'data:' + imgFiles[i].mimetype + ';base64,' + b64;

        const imageName = imgFiles[i].originalname.split('.')[0];
        const urlOptions = {
          folder: 'nhathuoc/products',
          public_id: formatHelper.converStringToSlug(imageName)
        };
        const secure_url = await handleCreateImageUpload(dataURI, urlOptions);
        urlCloundCreated.push(secure_url);
      }

      if (!urlCloundCreated.length) {
        res.status(500).json({
          message: 'Hình ảnh sản phẩm chưa được tạo'
        });
      }

      if (urlCloundCreated.length > 0) {
        const { ...product } = req.body;
        const slug = formatHelper.converStringToSlug(product.name);
        const newProduct = new ProductModel({ slug, ...product });
        await newProduct.save();

        for (let i = 0; i < urlCloundCreated.length; i++) {
          const newImageProduct = new ImagesModel({ product_id: newProduct._id, url_img: urlCloundCreated[i] });
          await newImageProduct.save();
        }

        res.status(201).json({
          message: 'Sản phẩm mới đã được tạo thành công.'
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tạo sản phẩm: ' + error.message });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const productsList = await ProductModel.find({});
      if (productsList) {
        res.status(200).json(productsList);
      }
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm: ' + error.message });
    }
  },
  getListProductBestSeller: async (req, res) => {
    try {
      const limitProduct = Number.parseInt(req.query.limit) || 1000;
      const listProductBestOrder = await OrderDetailsModel.aggregate([
        {
          $group: { _id: '$product_id', totalSold: { $sum: 1 } }
        },
        { $sort: { totalSold: -1 } },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' }
      ]).limit(limitProduct);
      return res.status(200).json(listProductBestOrder);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm bán chạy nhất: ' + error.message });
    }
  },
  getListProductNew: async (req, res) => {
    try {
      const limitProduct = Number.parseInt(req.query.limit) || 1000;
      const listProductNew = await ProductModel.find().sort({ createdAt: -1 }).limit(limitProduct);
      return res.status(200).json(listProductNew);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm mới: ' + error.message });
    }
  },
  getListProductRecommend: async (req, res) => {
    try {
      const limitProduct = Number.parseInt(req.query.limit) || 1000;
      const listProductRecommend = await ProductModel.aggregate([{ $sample: { size: limitProduct } }]);
      return res.status(200).json(listProductRecommend);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm gợi ý: ' + error.message });
    }
  },
  getListProductRelative: async (req, res) => {
    try {
      const { category } = req.query;
      const limitProduct = Number.parseInt(req.query.limit) || 1000;
      const { ObjectId } = mongoose.Types;
      const fliter = { sub_category_id: new ObjectId(category) };
      const listProductRelative = await ProductModel.find(fliter).limit(limitProduct);
      return res.status(200).json(listProductRelative);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm liên quan: ' + error.message });
    }
  },
  getProductWithById: async (req, res) => {
    try {
      const { id } = req.params;
      const { ObjectId } = mongoose.Types;
      const convertId = new ObjectId(id);

      const product = await ProductModel.aggregate([
        { $match: { _id: convertId } },
        {
          $lookup: {
            from: 'images',
            localField: '_id',
            foreignField: 'product_id',
            as: 'images'
          }
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand_id',
            foreignField: '_id',
            as: 'brand'
          }
        }
      ]);
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy chi tiết sản phẩm: ' + error.message });
    }
  },
  getListProductFilter: async (req, res) => {
    try {
      const { category, key, sortField, sortOrder } = req.query;
      if (!category && !key) {
        return res.status(404).json({ message: 'không tìm thấy sản phẩm' });
      }
      const { ObjectId } = mongoose.Types;
      const convertId = new ObjectId(category);
      let sortOptions = {};
      if (sortField && sortOrder) {
        sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
      }
      const listProductFilter = await ProductModel.find({
        $or: [{ name: new RegExp(key, 'i') }, { sub_category_id: convertId }]
      }).sort(sortOptions);
      return res.status(200).json(listProductFilter);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm: ' + error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productBody = req.body;
      const slug = formatHelper.converStringToSlug(productBody.name);
      const updateProduct = await ProductModel.findByIdAndUpdate(id, { slug, ...productBody }, { new: true });
      if (!updateProduct) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.status(200).json({
        message: 'sản phẩm đã được cập nhật thành công.',
        product: updateProduct
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm: ' + error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteProduct = await ProductModel.findByIdAndDelete(id);

      if (deleteProduct) {
        const deleteImages = await ImagesModel.deleteMany({ product_id: deleteProduct._id });
        console.log(`${deleteImages.deletedCount} `);
      }
      if (!deleteProduct) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.status(200).json({ message: 'Sản phẩm đã bị xóa' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa sản phẩm: ' + error.message });
    }
  }
};

module.exports = ProductController;
