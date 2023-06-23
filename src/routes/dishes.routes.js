const { Router } = require('express')
const dishesRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const multer = require('multer')
const uploadConfig = require('../configs/upload')
const upload = multer(uploadConfig.MULTER)

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

dishesRoutes.post(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  dishesController.create
)

dishesRoutes.get('/show/:id', dishesController.show)
dishesRoutes.delete('/delete/:id', dishesController.delete)
dishesRoutes.get('/index', dishesController.index)
dishesRoutes.get('/patch/:id', upload.single('image'), dishesController.patch)

module.exports = dishesRoutes
