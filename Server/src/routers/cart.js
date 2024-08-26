const CartController = require('../controllers/cartController/cart');
const Router = require('express').Router()

Router.post('/', CartController.addToCart)
Router.get('/:userId', CartController.getCartByUserId)
Router.delete('/:id', CartController.deleteCartById)
Router.put('/updateCart', CartController.updateCart)
Router.delete('/product/:userId', CartController.deleteProductCart)


module.exports = Router