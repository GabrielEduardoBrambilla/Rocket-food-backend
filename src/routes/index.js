const { Router } = require('express')

const usersRouter = require('./users.routes')
const dishesRouter = require('./dishes.routes')
const favoriteListRouter = require('./favoriteList.routes')
const shoppingCartRouter = require('./shopping_cart.routes')
const ingredientsRouter = require('./ingredients.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()

function userTypeVerifier(req, res, next) {
  if (!req.body.type === 2) {
    return res.json({ message: 'user is not an administrator' })
  }

  next()
}

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRouter)
routes.use('/favoritelist', favoriteListRouter)
routes.use('/shoppingcart', shoppingCartRouter)
routes.use('/ingredients', ingredientsRouter)
// Create order controller
// routes.use('/order', sessionsRouter)
routes.use('/sessions', sessionsRouter)

module.exports = routes
