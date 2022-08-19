const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticated, getAllProducts);
router.route("/products").post(createProduct);
router
  .route("/products/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

module.exports = router;
