const express = require('express')
const {
  createOrder,
  getSingleOrder,
  getAllOrders,
} = require('../controllers/orderController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/orders').post(isAuthenticated, createOrder)

router
  .route('/admin/orders')
  .get(isAuthenticated, authorizeRoles('admin'), getAllOrders)
router
  .route('/admin/orders/:id')
  .get(isAuthenticated, authorizeRoles('admin'), getSingleOrder)
module.exports = router
