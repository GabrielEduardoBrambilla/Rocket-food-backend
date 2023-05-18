const { Router } = require('express')
const usersRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.delete('/delete', ensureAuthenticated, usersController.delete)

module.exports = usersRoutes
