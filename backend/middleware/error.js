const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal server error'
  console.log(err)
  // handling mongodb id error(cast error)
  if (err.name === 'CastError') {
    const message = `resource not found. invalid: ${err.path}`
    err = new ErrorHandler(400, message)
  }
  // json webtoken error
  if (err.name === 'JsonWebTokenError') {
    const message = `json web token is invalid. please try again`
    err = new ErrorHandler(400, message)
  }

  // json webtoken expire error
  if (err.name === 'TokenExpiredError') {
    const message = `json web token is expired. please try again`
    err = new ErrorHandler(400, message)
  }

  // handle mongoose duplicate key error
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(400, message)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}
