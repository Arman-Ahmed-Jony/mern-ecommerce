const express = require('express')
const {
  createOrder,
  getSingleOrder,
} = require('../controllers/orderController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/order').post(isAuthenticated, createOrder)
router
  .route('/order/:id')
  .get(isAuthenticated, authorizeRoles('admin'), getSingleOrder)
module.exports = router
