const { Router } = require('express')
const ordersRoutes = Router()

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController()

ordersRoutes.post('/', ordersController.create)
ordersRoutes.get('/show', ordersController.show)
ordersRoutes.delete('/delete', ordersController.delete)
ordersRoutes.get('/index/:id', ordersController.index)

module.exports = ordersRoutes
