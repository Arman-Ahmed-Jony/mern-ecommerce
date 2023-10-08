const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const JWT = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
    maxlenght: [30, 'name cannot exceed 30 characters'],
    minlength: [4, 'name should be more than 4 character'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
    minlength: [8, 'password should be greater than 8 character'],
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
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

// this hook will be called while saving and updating
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcryptjs.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

userSchema.methods.comparePassword = async function (enterendPassword) {
  return await bcryptjs.compare(enterendPassword, this.password)
}

// generating reset password token
userSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString('hex')
  // hashing and adding to user schema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000  // 15 minutes
  return token
}
module.exports = mongoose.model('User', userSchema)
