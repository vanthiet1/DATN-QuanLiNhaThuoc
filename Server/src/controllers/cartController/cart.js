const CartModel = require('../../models/cartModel/cart');
const User = {
    addToCart: async (req, res) => {
        try {
            const { userId, productList, totalPrice } = req.body
            const Cart = new CartModel({
                userId,
                productList,
                totalPrice
            })
            await Cart.save()
            res.status(200).json(Cart)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getCartByUserId: async (req, res) => {
        try {
            const { userId } = req.params
            const Cart = await CartModel.findOne({ userId })
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
            const Cart = await CartModel.findByIdAndDelete(id)
            
            res.status(200).json({message:"Đã loại bỏ món hàng này"})
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateCart: async (req,res)=>{
        try {
            const { userId, productId, quantity } = req.body;
            let cart = await CartModel.findOne({ userId });
            console.log(cart);
            
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