const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFunction = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendJWTToken = require("../utils/sendJWTToken");

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
