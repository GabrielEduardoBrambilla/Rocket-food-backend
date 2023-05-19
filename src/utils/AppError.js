class AppError extends Error {
  message
  statusCode

  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    // this.status = `${statusCode}`.startsWith('3') ? 'fail' : 'error'
    this.isOperational = true
    this.message = message

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
