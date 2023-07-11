const knex = require('../database/knex')

class PaymentController {
  async create(request, response) {
    const { orderPrice } = request.body
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const id_user = request.user.id

    try {
      const orderPaymentIntend = await knex.transaction(async trx => {
        const paymentIntend = await trx('orders')
          .select('paymentIntent_id')
          .where({
            id_user: id_user,
            status: 'received'
          })
          .first()

        if (paymentIntend) {
          return paymentIntend.paymentIntent_id
        } else {
          return false
        }
      })
      if (orderPaymentIntend) {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          'pi_3NRwznGx2rwi3ccL1E2NJEG9'
        )
        return response
          .status(200)
          .json({ clientSecret: paymentIntent.client_secret })
        // Where I should just update the amount of the paymentIntend
      } else {
        // Create an order Intent and update the order in db
        const orderId = await knex.transaction(async trx => {
          const openedOrder = await trx('orders')
            .select('id')
            .where({
              id_user: id_user,
              status: 'received'
            })
            .first()

          if (openedOrder) {
            return openedOrder.id
          } else {
            console.log('Error is here ' + e.message)
            return response.status(400).json({ error: e.message })
          }
        })

        // Create a payment Intent then
        const paymentIntent = await stripe.paymentIntents.create({
          currency: 'EUR',
          amount: orderPrice,
          automatic_payment_methods: {
            enabled: true
          }
        })
        await knex('orders')
          .update({
            paymentIntent_id: paymentIntent.id
          })
          .where({
            id: orderId
          })
      }

      // Send publishable key and PaymentIntent details to client

      // This payment is not DEFINED CAUSE I'm getting i from the DB cause it's the second time the user is calling in.
      return response
        .status(200)
        .json({ clientSecret: paymentIntent.client_secret })
    } catch (e) {
      console.log(e.message)
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
