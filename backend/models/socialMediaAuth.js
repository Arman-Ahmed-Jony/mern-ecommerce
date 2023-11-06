const mongoose = require('mongoose')

const SocialMediaAuth = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('SocialMediaAuth', SocialMediaAuth)
