const { Router } = require('express')
const paymentRoutes = Router()

const PaymentController = require('../controllers/PaymentController')
const paymentController = new PaymentController()

paymentRoutes.post('/create', paymentController.create)
paymentRoutes.get('/config', paymentController.show)

module.exports = paymentRoutes
