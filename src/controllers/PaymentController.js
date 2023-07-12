const knex = require('../database/knex')

class PaymentController {
  async create(request, response) {
    const { orderPrice, paymentMethodId } = request.body
    const id_user = request.user.id
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const cleanedPrice = orderPrice.toString().replace('.', '')

    // Create a payment Intent then
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: cleanedPrice,
      automatic_payment_methods: {
        enabled: true
      },
      return_url: 'https://google.com/',
      confirm: true,
      payment_method: paymentMethodId,
      use_stripe_sdk: true
    })

    // const payIntent = await stripe.paymentIntents.create(paymentIntent.id, {
    //   payment_method: paymentMethodId
    // })

    return response.status(200).json({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status
    })
  }

  async show(request, response) {
    const env = require('dotenv').config({ path: '../.env' })
    return response
      .status(200)
      .json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
  }

  async update(request, response) {
    const { status } = request.body
    console.log(status)
    const id_user = request.user.id

    const filteredStatus = status === 'succeeded' ? 'paid' : 'failed'
    console.log(filteredStatus)

    if (filteredStatus === 'failed') {
      return response.status(400).json({ error: e.message })
    }
    try {
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

      await knex('orders')
        .update({
          status: filteredStatus
        })
        .where({
          id_user,
          id: orderId
        })

      return response.status(200).json({
        redirect: '/orders/successfulPayment'
      })
    } catch (e) {
      console.log(e.message)
      return response.status(400).json({ error: e.message })
    }
  }
}

module.exports = PaymentController
