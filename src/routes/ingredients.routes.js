const { Router } = require('express')
const ingredientsRoutes = Router()

const IngredientsController = require('../controllers/IngredientsController')
const ingredientsController = new IngredientsController()

ingredientsRoutes.post('/', ingredientsController.create)
ingredientsRoutes.get('/show', ingredientsController.show)
ingredientsRoutes.delete('/delete', ingredientsController.delete)
ingredientsRoutes.get('/index', ingredientsController.index)

module.exports = ingredientsRoutes
