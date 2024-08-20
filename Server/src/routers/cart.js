const Cart = require('../controllers/cartController/cart');
const Router = require('express').Router()
Router.post('/', Cart.AddToCart)
Router.get('/:userId', Cart.GetCartByUserId)
Router.delete('/:id', Cart.DeleteCartById)


module.exports = Router