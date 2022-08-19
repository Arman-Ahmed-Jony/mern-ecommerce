const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler(401, "please login to access this resource"));
  }
  const decodedData = JWT.verify(token, process.env.JWT_SECRET_KEY);
  res.user = await User.findById(decodedData.id);
  next();
});
