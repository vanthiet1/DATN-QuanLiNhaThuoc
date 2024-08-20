const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {  
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        // productListId: {
        //     // type: mongoose.Schema.Types.ObjectId,
        //     // ref: 'Product', 
        //     // required: true
        // },
        productList: [
            {
            productId: String, 
            name: String, 
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }],
        totalPrice:{
            type:Number,
            require:true
        }
    }
)
const CartModel = mongoose.model('Cart', cartSchema)
module.exports = CartModel