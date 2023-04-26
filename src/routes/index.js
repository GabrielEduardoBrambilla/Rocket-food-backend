const { Router } = require('express')

const usersRouter = require('./users.routes')
const dishesRouter = require('./dishes.routes')

const routes = Router()

function userTypeVerifier(req, res, next) {
  if (!req.body.type === 2) {
    return res.json({ message: 'user is not an administrator' })
  }

  next()
}

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRouter)

module.exports = routes
