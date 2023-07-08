const { Router } = require('express')

const usersRouter = require('./users.routes')
const dishesRouter = require('./dishes.routes')
const favoriteListRouter = require('./favoriteList.routes')
const ingredientsRouter = require('./ingredients.routes')
const sessionsRouter = require('./sessions.routes')
const ordersRouter = require('./order.routes')
const paymentRouter = require('./payment.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRouter)
routes.use('/favoritelist', favoriteListRouter)
routes.use('/ingredients', ingredientsRouter)
// Create order controller
routes.use('/order', ordersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/payment', paymentRouter)

module.exports = routes
