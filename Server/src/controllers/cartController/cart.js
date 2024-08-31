const CartModel = require('../../models/cartModel/cart');
const ProductModel = require('../../models/productModel/product');

const User = {
    addToCart: async (req, res) => {
        try {
            const { userId, products, totalPrice } = req.body; 
            let cart = await CartModel.findOne({ userId });
    
            if (!cart) {
                cart = new CartModel({
                    userId,
                    productList: [],
                    totalPrice
                });
            }
    
            for (const prod of products) {
                const { productId, quantity } = prod;
                const product = await ProductModel.findById(productId);
                
                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${productId} not found.` });
                }
    
                const existingProductIndex = cart.productList.findIndex(p => p.productId.toString() === productId);
    
                if (existingProductIndex > -1) {
                    cart.productList[existingProductIndex].quantity += quantity;
                } else {
                    cart.productList.push({
                        productId,
                        name: product.name,
                        quantity,
                        price: product.price_old
                    });
                }
            }
    
            cart.totalPrice = totalPrice;
            await cart.save();
    
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },  
    getCartByUserId: async (req, res) => {
        try {
            const { userId } = req.params
            const Cart = await CartModel.find({ userId })
            if (!Cart) {
                return res.status(404).json({ message: "Giỏ hàng của người dùng nãy rỗng" });
            }
            res.status(200).json(Cart)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteCartById: async (req, res) => {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
            }
          await CartModel.findByIdAndDelete(id)
            
            res.status(200).json({message:"Đã loại bỏ món hàng này"})
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteProductCart: async (req, res) => {
        try {
            const { userId } = req.params; 
            const { productId } = req.body;
    
            let cart = await CartModel.findOne({ userId });
            
            if (!cart) { 
                return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
            }
    
            cart.productList = cart.productList.filter(item => item.productId.toString() !== productId.toString());
    
            if (cart.productList.length === 0) {
                await CartModel.deleteOne({ userId });
                return res.status(200).json({ message: "Giỏ hàng đã được xóa vì không còn sản phẩm nào" });
            }
    
            cart.totalPrice = cart.productList.reduce((total, item) => {
                const price = Number(item.price_old) || 0;
                return total + (item.quantity * price);
            }, 0);
    
            await cart.save();
            res.status(200).json({ message: "Đã loại bỏ món hàng này", cart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateCart: async (req,res)=>{
        try {
            const { userId, productId, quantity } = req.body;
            let cart = await CartModel.findOne({ userId });            
            if(!cart){
               return res.status(404).json({ message: "Cart not found for this user." });
            }
    
            const productIndex = cart.productList.findIndex(item => item.productId === productId);
            if(productIndex > -1){
                cart.productList[productIndex].quantity = quantity;
                cart.totalPrice = cart.productList.reduce((total, item) => total + item.quantity * item.price, 0);
                await cart.save();
            }
            return res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }
}
module.exports = User