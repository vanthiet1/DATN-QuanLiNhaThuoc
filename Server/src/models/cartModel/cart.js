const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {  
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        productList: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products', 
                required: true 
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            totalPriceProduct: {
                type: Number,
                required: false 
            }
        }], 
        totalPrice: {
            type: Number,
            required: true 
        }
    }
);

const CartModel = mongoose.model('Cart', cartSchema);
module.exports = CartModel;
