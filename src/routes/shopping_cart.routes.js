const { Router } = require('express')
const shopping_cartRoutes = Router()

const ShoppingCart = require('../controllers/ShoppingCartController')
const shoppingCartController = new Shopping_cartController()

shoppingCartController.post('/', shoppingCartController.create)
shoppingCartController.get('/show', shoppingCartController.show)
shoppingCartController.delete('/delete', shoppingCartController.delete)
shoppingCartController.get('/index', shoppingCartController.index)

module.exports = dishesRoutes
