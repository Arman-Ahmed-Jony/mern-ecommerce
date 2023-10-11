const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  review,
  getAllReviewsByProductId,
  deleteReviewById,
} = require('../controllers/productController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(isAuthenticated, getAllProducts)
router.route('/products/:id').get(getProductDetails)
router
  .route('/products/:id/review')
  .get(getAllReviewsByProductId)
  .put(isAuthenticated, review)

router
  .route('/products/:id/review/:reviewId')
  .delete(isAuthenticated, deleteReviewById)

router
  .route('/admin/products')
  .post(isAuthenticated, authorizeRoles('admin'), createProduct)
router
  .route('/admin/products/:id')
  .put(isAuthenticated, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteProduct)

module.exports = router
