const { Router } = require('express')
const dishesRoutes = Router()

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()
// console.log('Dishes router')
dishesRoutes.post('/', dishesController.create)

module.exports = dishesRoutes
