const Order = require('../models/orderModel')
const catchAsyncFunction = require('../middleware/catchAsyncErrors')

exports.createOrder = catchAsyncFunction(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    createdBy: req.user._id,
  })
  res
    .status(201)
    .json({ success: 'true', message: 'ordered successfully', order })
})
