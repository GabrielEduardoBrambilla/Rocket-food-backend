const { Router } = require('express')
const dishesRoutes = Router()

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

dishesRoutes.post('/', dishesController.create)
dishesRoutes.get('/show', dishesController.show)
dishesRoutes.delete('/delete', dishesController.delete)
dishesRoutes.get('/index', dishesController.index)

module.exports = dishesRoutes
