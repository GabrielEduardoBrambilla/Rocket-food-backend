require('express-async-errors')
const migrationsRunner = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')

const cors = require('cors')

const express = require('express')

const routes = require('./routes')

const uploadConfig = require('./configs/upload')

migrationsRunner()

const app = express()

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

const PORT = 3352

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
