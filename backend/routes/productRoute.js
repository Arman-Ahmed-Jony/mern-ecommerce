const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require('../controllers/productController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/products/:id').get(getProductDetails)

router
  .route('/admin/products')
  .post(isAuthenticated, authorizeRoles('admin'), createProduct)
router
  .route('/admin/products/:id')
  .put(isAuthenticated, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteProduct)

module.exports = router
