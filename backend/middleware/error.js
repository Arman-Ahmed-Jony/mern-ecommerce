// const ErrorHandler = require("../utils/errorHandler");

const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // handling mongodb id error(cast error)
  if (err.name === 'CastError') {
    const message = `resource not found. invalid: ${err.path}`
    err = new ErrorHandler(400, message)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
