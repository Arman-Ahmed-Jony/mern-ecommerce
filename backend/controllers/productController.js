const Product = require("../models/productModel");

// create product -- admin
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// get all product
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

// update product -- admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
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
};


// delete product --admin
exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            success: false, message: "product not found" 
        })
    }

    await product.remove()
    res.status(200).json({
        success: true, message: "product deleted successfully" 
    })
}