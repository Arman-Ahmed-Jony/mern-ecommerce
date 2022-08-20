const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFunction = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");

// create product -- admin
exports.createProduct = catchAsyncFunction(async (req, res) => {
  // adding created by user before saving, logged in user has user in the request body
  // * note: we can use req.user.id or req.user._id
  req.body.createdBy = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all product
exports.getAllProducts = catchAsyncFunction(async (req, res) => {
  const total = await Product.countDocuments();
  const resultPerPage = Number(req.query.resultPerPage) || 5;
  const currentPage = Number(req.query.page) || 1;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage, currentPage);
  const products = await apiFeature.query;
  res
    .status(200)
    .json({ success: true, products, resultPerPage, currentPage, total });
});

// get product details
exports.getProductDetails = catchAsyncFunction(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "product not found"));
  }

  res.status(200).json({ success: true, product });
});

// update product -- admin
exports.updateProduct = catchAsyncFunction(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler(404, "product not found"));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: `${error}` });
  }
});

// delete product --admin
exports.deleteProduct = catchAsyncFunction(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "product not found"));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
