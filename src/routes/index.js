const { Router } = require('express')

const usersRouter = require('./users.routes')
const dishesRouter = require('./dishes.routes')
const favorite_ListRouter = require('./favoriteList.routes')
const shopping_Cart = require('./shopping_cart.routes')
const ingredients = require('./ingredients.routes')

const routes = Router()

function userTypeVerifier(req, res, next) {
  if (!req.body.type === 2) {
    return res.json({ message: 'user is not an administrator' })
  }

  next()
}

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRouter)
routes.use('/favoritelist', favorite_ListRouter)
routes.use('/shoppingcart', shopping_Cart)
routes.use('/ingredients', ingredients)
routes.use('/order', ingredients)

module.exports = routes
