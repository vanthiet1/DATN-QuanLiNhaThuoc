const CartModel = require('../../models/cartModel/cart');
const ProductModel = require('../../models/productModel/product');
const ImageProduct = require('../../models/imageModels/image');
const Cart = {
  addToCart: async (req, res) => {
    try {
      const { userId, products } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'userId không được để trống.' });
      }
      if (!products || products.length === 0) {
        return res.status(400).json({ message: 'Phải có ít nhất một sản phẩm trong giỏ hàng.' });
      }

      let cart = await CartModel.findOne({ userId });

      if (!cart) {
        cart = new CartModel({
          userId, // Thêm userId
          productList: [],
          totalPrice: 0
        });
      }

      for (const prod of products) {
        const { productId, quantity } = prod;
        const product = await ProductModel.findById(productId);

        if (!product) {
          return res.status(404).json({ message: `Không tìm thấy sản phẩm` });
        }

        const existingProductIndex = cart.productList.findIndex((item) => item.productId.toString() === productId);

        const price = Number(product.price_distcount);
        const totalPriceProduct = price * Number(quantity);

        if (existingProductIndex > -1) {
          cart.productList[existingProductIndex].quantity += quantity;
          cart.productList[existingProductIndex].totalPriceProduct =
            cart.productList[existingProductIndex].quantity * price;
        } else {
          cart.productList.push({
            productId,
            name: product.name,
            quantity: Number(quantity),
            price: Number(product.price_distcount),
            totalPriceProduct: totalPriceProduct
          });
        }
      }

      await cart.save();

      cart.totalPrice = cart.productList.reduce((total, item) => {
        return total + (item.totalPriceProduct || 0);
      }, 0);

      await cart.save();

      res.status(201).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công', cart });
    } catch (error) {
      console.error('Lỗi trong addToCart:', error);
      res.status(500).json({ message: error.message });
    }
  },

  getCartByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await CartModel.findOne({ userId }).populate('productList.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Giỏ hàng của người dùng này rỗng' });
      }
      const cartProducts = await Promise.all(
        cart.productList.map(async (product) => {
          const images = await ImageProduct.find({ product_id: product.productId?._id });
          return {
            ...product.toObject(),
            images
          };
        })
      );

      res.status(200).json(cartProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCartById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
      }
      await CartModel.findByIdAndDelete(id);

      res.status(200).json({ message: 'Đã loại bỏ món hàng này' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteProductCart: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      let cart = await CartModel.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
      }

      cart.productList = cart.productList.filter((item) => item.productId.toString() !== productId.toString());

      if (cart.productList.length === 0) {
        await CartModel.deleteOne({ userId });
        return res.status(200).json({ message: 'Giỏ hàng đã được xóa vì không còn sản phẩm nào' });
      }

      await cart.save();

      const populatedCart = await CartModel.findOne({ userId }).populate('productList.productId');

      populatedCart.totalPrice = populatedCart.productList.reduce((total, item) => {
        const price = Number(item.productId.price_distcount) || 0;
        return total + item.quantity * price;
      }, 0);

      await populatedCart.save();

      res.status(200).json({ message: 'Đã loại bỏ món hàng này', cart: populatedCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || quantity == null || quantity < 0) {
        return res.status(400).json({ message: 'Invalid input data.' });
      }

      let cart = await CartModel.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user.' });
      }

      const productIndex = cart.productList.findIndex((item) => item.productId.toString() === productId.toString());

      if (productIndex > -1) {
        const productInCart = cart.productList[productIndex];

        // Truy vấn giá sản phẩm
        let product = await ProductModel.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found.' });
        }

        const productPrice = product.price_distcount;

        // Kiểm tra xem giá sản phẩm có hợp lệ không
        if (typeof productPrice !== 'number' || isNaN(productPrice)) {
          return res.status(500).json({ message: 'Invalid product price.' });
        }

        // Kiểm tra số lượng
        if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 0) {
          return res.status(400).json({ message: 'Invalid quantity.' });
        }

        // Cập nhật số lượng và tổng giá cho sản phẩm trong giỏ hàng
        productInCart.quantity = quantity;
        productInCart.totalPriceProduct = productPrice * quantity;

        // Tính lại tổng giá cho giỏ hàng
        cart.totalPrice = cart.productList.reduce((total, item) => total + (item.totalPriceProduct || 0), 0);

        await cart.save();
        return res.status(200).json(cart);
      } else {
        return res.status(404).json({ message: 'Product not found in the cart.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};
module.exports = Cart;
