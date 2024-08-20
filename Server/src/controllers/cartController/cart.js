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

}
module.exports = User