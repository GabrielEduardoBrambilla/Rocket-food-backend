const { Router } = require('express')
const favListRoutes = Router()

const FavoriteListController = require('../controllers/FavoriteListController')
const favListController = new FavoriteListController()

favListRoutes.post('/', favListController.create)
favListRoutes.get('/show', favListController.show)
favListRoutes.delete('/delete', favListController.delete)
favListRoutes.get('/index', favListController.index)

module.exports = favListRoutes
