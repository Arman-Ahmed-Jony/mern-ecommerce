const Order = require('../models/orderModel')
const catchAsyncFunction = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')

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

//get all my orders --user
exports.getMyOrders = catchAsyncFunction(async (req, res) => {
  const orders = await Order.find({ createdBy: req.user.id })
  res.status(200).json({ success: true, orders })
})

// get all orders --ADMIN--
exports.getAllOrders = catchAsyncFunction(async (req, res) => {
  const orders = await Order.find().populate(
    'createdBy', // *schema field that will be populated with/ mapped
    'name email', // *fields that will be added to that field
    'User' // *schema that needs to be mapped
  )
  res.status(200).json({ success: true, orders })
})

// get single order details --ADMIN --
exports.getSingleOrder = catchAsyncFunction(async (req, res, next) => {
  const id = req.params.id
  const order = await Order.findById(id).populate(
    'createdBy', // *schema field that will be populated with/ mapped
    'name email', // *fields that will be added to that field
    'User' // *schema that needs to be mapped/ refferenced collection
  )
  if (!order) {
    return next(new ErrorHandler(404, `Order not found with id : ${id}`))
  }
  res.status(200).json({ success: true, order })
})
