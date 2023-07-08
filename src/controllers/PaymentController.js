class PaymentController {
  async create(request, response) {
    const { orderPrice } = request.body
    try {
      console.log('Before paymentIntent: ')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        payment_method_types: ['card']
      })
      console.log('passed paymentIntent: ' + paymentIntent)

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
