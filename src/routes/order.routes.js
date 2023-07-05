const { Router } = require('express')
const ordersRoutes = Router()

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController()
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

ordersRoutes.post('/', ensureAuthenticated, ordersController.create)
ordersRoutes.patch('/update', ensureAuthenticated, ordersController.update)
ordersRoutes.delete('/delete', ensureAuthenticated, ordersController.delete)
ordersRoutes.get('/index/', ensureAuthenticated, ordersController.index)

module.exports = ordersRoutes
