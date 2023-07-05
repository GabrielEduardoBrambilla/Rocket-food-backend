const { Router } = require('express')
const favListRoutes = Router()

const FavoriteListController = require('../controllers/FavoriteListController')
const favListController = new FavoriteListController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

favListRoutes.post('/', ensureAuthenticated, favListController.create)
favListRoutes.get('/show', ensureAuthenticated, favListController.show)
favListRoutes.delete('/delete', ensureAuthenticated, favListController.delete)
favListRoutes.get('/index', ensureAuthenticated, favListController.index)

module.exports = favListRoutes
