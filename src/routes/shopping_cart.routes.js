const { Router } = require('express')
const shopping_cartRoutes = Router()

const ShoppingCartController = require('../controllers/ShoppingCartController')
const shoppingCartController = new ShoppingCartController()

shopping_cartRoutes.post('/', shoppingCartController.create)
shopping_cartRoutes.get('/show', shoppingCartController.show)
shopping_cartRoutes.delete('/delete', shoppingCartController.delete)
shopping_cartRoutes.get('/index', shoppingCartController.index)

module.exports = shopping_cartRoutes
