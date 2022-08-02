const mongoose = require("mongoose");

const productScema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "please provide product name"],
  },
  description: {
    type: String,
    required: [true, "please provide product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter price"],
    max: [8, "price cannot exceed  8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter a category"],
  },
  stock: {
    type: Number,
    required: [true, "please enter stock"],
    max: [4, "stock can not exceed 4 character"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productScema);
