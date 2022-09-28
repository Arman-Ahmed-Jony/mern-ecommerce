const Order = require('../models/orderModel')
const Product = require('../models/productModel')
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

// update order status --admin
exports.updateOrderStatus = catchAsyncFunction(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    return next(
      new ErrorHandler(404, `Order not found with id : ${req.params.id}`)
    )
  }
  if (req.body.status === 'Delivered') {
    return next(new ErrorHandler(404, `you have already delivered the order`))
  }

  order.orderItems.forEach(async (item) => {
    // todo: need to think about shipped items as these items are not available in stock
    await updateStock(item.product, item.quantity, 'reduce')
  })
  order.orderStatus = req.body.status
  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now()
  }
  await order.save()
  res.status(200).json({
    message: `Order ${order.id} has been updated successfully`,
    success: true,
    order,
  })
})

async function updateStock(id, quantity, op = 'reduce') {
  const product = await Product.findById(id)
  let stock = 0
  if (op === 'reduce') {
    stock = product.stock - quantity
  } else {
    stock = product.stock + quantity
  }
  product.stock = stock
  await product.save({ validateBeforeSave: false })
}

// delete order --admin
exports.deleteOrder = catchAsyncFunction(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    return next(
      new ErrorHandler(404, `Order not found with id : ${req.params.id}`)
    )
  }
  await order.remove()
  res.status(200).json({
    message: `Order ${order.id} has been deleted successfully`,
    success: true,
  })
})
