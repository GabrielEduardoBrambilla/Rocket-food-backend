const { Router } = require('express')
const favListRoutes = Router()

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController()

favListRoutes.post('/', ordersController.create)
favListRoutes.get('/show', ordersController.show)
favListRoutes.delete('/delete', ordersController.delete)
favListRoutes.get('/index', ordersController.index)

module.exports = favListRoutes
