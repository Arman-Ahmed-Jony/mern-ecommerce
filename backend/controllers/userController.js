const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFunction = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

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
  res.status(200).json({
    success: true,
    user,
  });
});
