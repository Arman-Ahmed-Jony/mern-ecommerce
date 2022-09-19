const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const JWT = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return next(new ErrorHandler(401, 'please login to access this resource'))
  }
  const decodedData = JWT.verify(token, process.env.JWT_SECRET_KEY)
  // adding user with request for further use
  req.user = await User.findById(decodedData.id)
  next()
})

exports.authorizeRoles = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      )
    }
    next()
  }
}
