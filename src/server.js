require('express-async-errors')
require('dotenv/config')

const migrationsRunner = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')

const cors = require('cors')

const express = require('express')

const routes = require('./routes')
const uploadConfig = require('./configs/upload')
const app = express()

// STRIPE NEW
// const another_env = require('dotenv').config({ path: './.env' })
const env = require('dotenv').config({ path: './.env' })

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
})

app.post('/create-payment-intent', cors(), async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'EUR',
      amount: 1999,
      automatic_payment_methods: { enabled: true }
    })

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message
      }
    })
  }
})

migrationsRunner()

app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
  const fileName = __filename.split('/').pop()
  if (error instanceof AppError) {
    console.error(`${fileName}: ${error} ${error.statusCode}`)

    return response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      statusCode: error.statusCode
    })
  }

  console.error(`${fileName}: ${error}`)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = process.env.SERVER_PORT || 3333

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
