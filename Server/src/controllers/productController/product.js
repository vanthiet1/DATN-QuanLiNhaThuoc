const ImagesModel = require('../../models/imageModels/image');
const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');
const ProductModel = require('../../models/productModel/product');
const { handleCreateImageUpload, handleDeleteImageUpload } = require('../../services/mediaCloudinary');
const formatHelper = require('../../utilities/helper/formatHelper');
const mongoose = require('mongoose');

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const {
        name,
        sub_category_id,
        brand_id,
        description,
        description_short,
        price_old,
        price_distcount,
        percent_price,
        stock
      } = req.body;
      if (
        !req.files ||
        !name ||
        !sub_category_id ||
        !brand_id ||
        !description ||
        !description_short ||
        !price_old ||
        !price_distcount ||
        !percent_price ||
        !stock
      ) {
        return res.status(404).json({
          message: 'Bạn cần nhập đầy đủ thông tin các trường'
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
        let slug = formatHelper.converStringToSlug(product.name);

        let existsSlug = await ProductModel.exists({ slug });
        let count = 1;
        while (existsSlug) {
          slug = `${slug}-${count}`;
          existsSlug = await ProductModel.exists({ slug });
          count++;
        }

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
      const { page, key, limit, categoryId, sortField, sortOrder } = req.query;
      const totalItems = await ProductModel.countDocuments();
      const itemOfPage = Number.parseInt(limit) || 8;
      const totalNumberPage = Math.ceil(totalItems / itemOfPage);
      const pageNumber = Number.parseInt(page) || 1;

      const filterConditions = {};
      if (key) {
        filterConditions.name = { $regex: key, $options: 'i' };
      }

      if (categoryId) {
        const { ObjectId } = mongoose.Types;
        const convertId = new ObjectId(categoryId);
        filterConditions.sub_category_id = convertId;
      }

      let sortOptions = {};
      if (sortField && sortOrder) {
        sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
      } else {
        sortOptions = { createdAt: -1 };
      }

      const productsList = await ProductModel.aggregate([
        {
          $match: filterConditions
        },
        {
          $lookup: {
            from: 'images',
            localField: '_id',
            foreignField: 'product_id',
            as: 'images'
          }
        }
      ])
        .skip((pageNumber - 1) * itemOfPage)
        .limit(itemOfPage)
        .sort(sortOptions);

      if (productsList) {
        res.status(200).json({ totalItems, totalNumberPage, itemOfPage, productsList });
      }
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm: ' + error.message });
    }
  },
  getListProductBestSeller: async (req, res) => {
    try {
      const limitProduct = Number.parseInt(req.query.limit) || 8;
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
      const limitProduct = Number.parseInt(req.query.limit) || 8;
      const listProductNew = await ProductModel.aggregate([
        {
          $lookup: {
            from: 'images',
            localField: '_id',
            foreignField: 'product_id',
            as: 'images'
          }
        }
      ]).limit(limitProduct);
      return res.status(200).json(listProductNew);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm mới: ' + error.message });
    }
  },
  getListProductRecommend: async (req, res) => {
    try {
      const limitProduct = Number.parseInt(req.query.limit) || 8;
      const queryKey = req.query.key || '';
      const listProductRecommend = await ProductModel.aggregate([
        {
          $match: {
            name: { $regex: queryKey, $options: 'i' }
          }
        },
        { $sample: { size: limitProduct } },
        {
          $lookup: {
            from: 'images',
            localField: '_id',
            foreignField: 'product_id',
            as: 'images'
          }
        }
      ]);
      return res.status(200).json(listProductRecommend);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm gợi ý: ' + error.message });
    }
  },
  getListProductRelative: async (req, res) => {
    try {
      const { category_id } = req.query;
      const limitProduct = Number.parseInt(req.query.limit) || 8;
      const { ObjectId } = mongoose.Types;
      const listProductRelative = await ProductModel.aggregate([
        {
          $match: {
            sub_category_id: new ObjectId(category_id)
          }
        },
        {
          $lookup: {
            from: 'images',
            localField: '_id',
            foreignField: 'product_id',
            as: 'images'
          }
        }
      ]).limit(limitProduct);

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
  getProductWithBySlug: async (req, res) => {
    try {
      const { slug } = req.params;
      if (slug) {
        const product = await ProductModel.aggregate([
          { $match: { slug: slug } },
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
          },
          {
            $lookup: {
              from: 'subcategories', 
              localField: 'sub_category_id',  
              foreignField: '_id', 
              as: 'sub_category'
            }
          }
        ])
        return res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy chi tiết sản phẩm: ' + error.message });
    }
  },
  getListProductFilter: async (req, res) => {
    try {
      const { category, key, sortField, sortOrder } = req.query;
      // if (!category && !key) {
      //   return res.status(404).json({ message: 'không tìm thấy sản phẩm' });
      // }
      const { ObjectId } = mongoose.Types;
      const convertId = new ObjectId(category);
      let sortOptions = {};
      if (sortField && sortOrder) {
        sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
      }

      const filterConditions = {};

      // Thêm điều kiện tìm theo tên sản phẩm nếu có key
      if (key) {
        filterConditions.name = { $regex: key, $options: 'i' };
      }
      const listProductFilter = await ProductModel.aggregate([
        {
          $match: filterConditions
        },
        {
          $lookup: {
            from: 'images',
            localField: '_id',
            foreignField: 'product_id',
            as: 'images'
          }
        },
        {
          $sort: sortOptions
        }
      ]);
      return res.status(200).json(listProductFilter);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm: ' + error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productBody = req.body;
      const imgFiles = req.files || [];
      const urlCloundCreated = [];

      // const oldImages = await ImagesModel.find({ product_id: id });

      // if (oldImages && oldImages.length > 0) {
      //   for (let i = 0; i < oldImages.length; i++) {
      //     const imageUrl = oldImages[0].url_img;
      //     const public_id = imageUrl.substring(imageUrl.lastIndexOf('nhathuoc/products/'), imageUrl.lastIndexOf('.'));
      //     await handleDeleteImageUpload(public_id);
      //   }
      // }

      if (imgFiles.length > 0) {
        for (let i = 0; i < imgFiles.length; i++) {
          try {
            const b64 = Buffer.from(imgFiles[i].buffer).toString('base64');
            let dataURI = 'data:' + imgFiles[i].mimetype + ';base64,' + b64;

            const imageName = imgFiles[i].originalname.split('.')[0];
            const urlOptions = {
              folder: 'nhathuoc/products',
              public_id: formatHelper.converStringToSlug(imageName)
            };
            const secure_url = await handleCreateImageUpload(dataURI, urlOptions);
            urlCloundCreated.push(secure_url);
          } catch (error) {
            return res
              .status(500)
              .json({ message: `Image upload failed for ${imgFiles[i].originalname}: ${error.message}` });
          }
        }
      }

      if (!urlCloundCreated.length && imgFiles.length > 0) {
        return res.status(500).json({ message: 'Hình ảnh sản phẩm chưa được tạo' });
      }

      let slug = formatHelper.converStringToSlug(productBody.name);
      let existsSlug = await ProductModel.exists({ slug });
      let count = 1;
      while (existsSlug) {
        slug = `${slug}-${count}`;
        existsSlug = await ProductModel.exists({ slug });
        count++;
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(id, { slug, ...productBody }, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      if (urlCloundCreated.length > 0) {
        for (let i = 0; i < urlCloundCreated.length; i++) {
          try {
            const updatedImage = await ImagesModel.findOneAndUpdate(
              { product_id: updatedProduct._id },
              { url_img: urlCloundCreated[i] },
              { new: true }
            );
            if (updatedImage) {
              await updatedImage.save();
            }
          } catch (error) {
            console.error(`Error updating image for product ${updatedProduct._id}: ${error.message}`);
          }
        }
      }

      return res.status(200).json({
        message: 'Sản phẩm đã được cập nhật thành công.',
        product: updatedProduct
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
        const imageProduct = await ImagesModel.find({ product_id: deleteProduct._id });
        for (let i = 0; i < imageProduct.length; i++) {
          const imageUrl = imageProduct[i].url_img;
          const public_id = imageUrl.substring(imageUrl.lastIndexOf('nhathuoc/products/'), imageUrl.lastIndexOf('.'));
          await handleDeleteImageUpload(public_id);
        }
        await ImagesModel.deleteMany({ product_id: deleteProduct._id });
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
