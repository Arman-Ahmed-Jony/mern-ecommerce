const mongoose = require('mongoose')

const OrderScema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'please provide address'],
    },
    city: {
      type: String,
      required: [true, 'please provide city'],
    },
    state: {
      type: String,
      required: [true, 'please provide state'],
    },
    country: {
      type: String,
      required: [true, 'please provide country'],
    },
    pinCode: {
      type: Number,
      required: [true, 'please provide pinCode'],
    },
    phoneNo: {
      type: Number,
      required: [true, 'please provide phone number'],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, 'please provide name'],
      },
      price: {
        type: Number,
        required: [true, 'please provide price'],
      },
      quantity: {
        type: Number,
        required: [true, 'please provide quantity'],
      },
      image: {
        type: String,
        required: [true, 'please provide image'],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: [true, 'please provide product'],
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'processing',
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
})

module.exports = mongoose.model('Order', OrderScema)
