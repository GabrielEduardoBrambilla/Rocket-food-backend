class PaymentController {
  async create(request, response) {
    const { orderPrice } = request.body
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: 'EUR',
        amount: orderPrice,
        automatic_payment_methods: {
          enabled: true
        }
      })

      // Send publishable key and PaymentIntent details to client
      return response
        .status(200)
        .json({ clientSecret: paymentIntent.client_secret })
    } catch (e) {
      console.log('deu ruim')
      return response.status(400).json({ error: e.message })
    }
  }
  async show(request, response) {
    const env = require('dotenv').config({ path: '../.env' })
    return response
      .status(200)
      .json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
  }
}

module.exports = PaymentController
