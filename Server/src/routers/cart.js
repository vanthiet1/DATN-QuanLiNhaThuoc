const Cart = require('../controllers/cartController/cart');
const Router = require('express').Router()
Router.post('/', Cart.addToCart)
Router.get('/:userId', Cart.getCartByUserId)
Router.delete('/:id', Cart.deleteCartById)


module.exports = Router