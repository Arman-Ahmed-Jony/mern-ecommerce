const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    max: [30, "name cannot exceed 30 characters"],
    min: [4, "name should be more than 4 character"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    min: [8, "password should be greater than 8 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


module.exports = mongoose.model("User", userSchema)