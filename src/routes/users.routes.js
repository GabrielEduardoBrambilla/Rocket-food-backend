const { Router } = require('express')
const usersRoutes = Router()

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.delete('/delete', usersController.delete)

module.exports = usersRoutes
