const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFunction = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendJWTToken = require("../utils/sendJWTToken");
const sendEmail = require("../utils/sendEmail")
/**
 * @name registerUser
 * @description registers a user and sends a token to
 */
exports.registerUser = catchAsyncFunction(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "demo id",
      url: "demo url",
    },
  });

  sendJWTToken(201, user, res);
});

exports.loginUser = catchAsyncFunction(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is given or else throw an error

  if (!email || !password)
    return next(new ErrorHandler(404, "please enter email and password"));

  // find user having the email and include password as we have added 'select: false' in model defination
  const user = await User.findOne({ email }).select("+password");

  // if user not found than throw error
  if (!user) return next(new ErrorHandler(401, "invalid email or password"));

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler(401, "invalid email or password"));

  sendJWTToken(200, user, res);
});

exports.logout = catchAsyncFunction(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

exports.forgotPassword = catchAsyncFunction(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "user not found"));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `your password reset token is : \n\n${resetPasswordURL}\n if you have not requested this email then please ignor it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(500, error.message));
  }
});
