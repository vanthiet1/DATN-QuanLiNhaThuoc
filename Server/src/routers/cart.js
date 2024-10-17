const Router = require('express').Router();
const CartController = require('../controllers/cartController/cart');

Router.post('/', CartController.addToCart)
Router.get('/:userId', CartController.getCartByUserId)
Router.delete('/:id', CartController.deleteCartById)
Router.put('/updateCart', CartController.updateCart)
Router.delete('/product/:userId/:productId', CartController.deleteProductCart)


module.exports = Router;
