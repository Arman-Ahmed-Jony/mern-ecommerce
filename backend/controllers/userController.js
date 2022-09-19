const ErrorHandler = require('../utils/errorHandler')
const catchAsyncFunction = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel')
const sendJWTToken = require('../utils/sendJWTToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const { removeEmptyValue } = require('../utils/utilities')

/**
 * @name registerUser
 * @description registers a user and sends a token to
 */
exports.registerUser = catchAsyncFunction(async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'demo id',
      url: 'demo url',
    },
  })

  sendJWTToken(201, user, res)
})

exports.loginUser = catchAsyncFunction(async (req, res, next) => {
  const { email, password } = req.body

  // check if email and password is given or else throw an error

  if (!email || !password)
    return next(new ErrorHandler(404, 'please enter email and password'))

  // find user having the email and include password as we have added 'select: false' in model defination
  const user = await User.findOne({ email }).select('+password')

  // if user not found than throw error
  if (!user) return next(new ErrorHandler(401, 'invalid email or password'))

  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched)
    return next(new ErrorHandler(401, 'invalid email or password'))

  sendJWTToken(200, user, res)
})

exports.logout = catchAsyncFunction(async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    message: 'logged out successfully',
  })
})

exports.forgotPassword = catchAsyncFunction(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler(404, 'user not found'))
  }

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetPasswordURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`

  const message = `your password reset token is : \n\n${resetPasswordURL}\n if you have not requested this email then please ignor it`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Ecommerce password recovery',
      message,
    })

    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully.`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(500, error.message))
  }
})

/**
 * @controller resetPassword: to reset the password with a reset password token password and confirmPassword
 * @method resetPassword
 * @requestBody {String} confirmPassword, {String} password
 * @requestParam {String} token : the password token hash
 */
exports.resetPassword = catchAsyncFunction(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  // if user not found than throw error
  if (!user)
    return next(
      new ErrorHandler(400, 'reset password token is invalid or expired')
    )
  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler(400, 'passwords do not match'))

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendJWTToken(200, user, res)
})

// get self user details
exports.getUserDetails = catchAsyncFunction(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    return next(new ErrorHandler(400, 'user not found'))
  }
  res.status(200).json({
    success: true,
    user,
  })
})

// change password or update password
/**
 * @controller changePassowrd: to change password or update password with a oldPassword, newPassword and confirmPassword
 * @method changePassowrd
 * @requestBody {String} confirmPassword, {String} oldPassword, {String} newPassword
 */
exports.changePassword = catchAsyncFunction(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  if (!user) {
    return next(new ErrorHandler(400, 'user not found'))
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, 'confirm password does not matched'))
  }

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
  if (!isPasswordMatched)
    return next(new ErrorHandler(401, 'invalid email or password'))

  user.password = req.body.newPassword
  await user.save()
  sendJWTToken(200, user, res)
})

/**
 * @method update  my(user) data
 * @requestBody {String} name, email
 */
exports.updateUser = catchAsyncFunction(async (req, res) => {
  const data = removeEmptyValue({
    name: req.body.name,
    email: req.body.email,
  })
  // todo: will add avatar support with cloudinary

  const user = await User.findByIdAndUpdate(req.user.id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})

// get all user --ADMIN
exports.getAllUsers = catchAsyncFunction(async (req, res) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    users,
  })
})

exports.getSingleUser = catchAsyncFunction(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorHandler(`user not found with id ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, user })
})
