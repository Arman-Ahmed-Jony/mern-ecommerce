const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncFunction = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/ApiFeatures')

// create product -- admin
exports.createProduct = catchAsyncFunction(async (req, res) => {
  // adding created by user before saving, logged in user has user in the request body
  // * note: we can use req.user.id or req.user._id
  req.body.createdBy = req.user.id
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})

// get all product
exports.getAllProducts = catchAsyncFunction(async (req, res) => {
  const total = await Product.countDocuments()
  const resultPerPage = Number(req.query.resultPerPage) || 5
  const currentPage = Number(req.query.page) || 1
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage, currentPage)
  const products = await apiFeature.query
  res
    .status(200)
    .json({ success: true, products, resultPerPage, currentPage, total })
})

// get product details
exports.getProductDetails = catchAsyncFunction(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler(404, 'product not found'))
  }

  res.status(200).json({ success: true, product })
})

// update product -- admin
exports.updateProduct = catchAsyncFunction(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id)
    if (!product) {
      return next(new ErrorHandler(404, 'product not found'))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: `${error}` })
  }
})

// delete product --admin
exports.deleteProduct = catchAsyncFunction(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler(404, 'product not found'))
  }

  await product.remove()
  res.status(200).json({
    success: true,
    message: 'product deleted successfully',
  })
})

// create new review/ update existing review
exports.review = catchAsyncFunction(async (req, res) => {
  const { rating, comment } = req.body
  const { id: productId } = req.params
  const review = {
    createdBy: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const product = await Product.findById(productId)
  const alreadyReviewedByUserIndex = product.reviews.findIndex(
    (rev) => rev.createdBy.toString() === req.user.id
  )
  if (~alreadyReviewedByUserIndex) {
    // review available of that user than it will update the review
    product.reviews[alreadyReviewedByUserIndex] = review
  } else {
    // review create
    product.reviews.push(review)
    product.numOfReviews++
  }
  product.rating =
    product.reviews.reduce((acc, cur) => {
      return (acc += cur.rating)
    }, 0) / product.numOfReviews
  await product.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
    message: 'product review saved successfully',
    product,
  })
})

exports.getAllReviewsByProductId = catchAsyncFunction(
  async (req, res, next) => {
    const productId = req.params.id

    const product = await Product.findById(productId)
    if (!product) {
      return next(new ErrorHandler(404, 'product not found'))
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    })
  }
)

exports.deleteReviewById = catchAsyncFunction(async (req, res, next) => {
  const productId = req.params.id
  const reviewId = req.params.reviewId
  const product = await Product.findById(productId)
  if (!product) {
    return next(new ErrorHandler(404, 'product not found'))
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== reviewId.toString()
  )
  const numberOfReviews = reviews.length
  // * note: number of reviews may become zero and rating dividing by zero will give NaN
  const rating = !numberOfReviews
    ? 0
    : reviews.reduce((acc, cur) => {
        return (acc += cur.rating)
      }, 0) / numberOfReviews

  await Product.findByIdAndUpdate(productId, {
    reviews,
    numberOfReviews,
    rating,
  })

  res
    .status(200)
    .json({ success: true, message: 'review deleted successfully' })
})
