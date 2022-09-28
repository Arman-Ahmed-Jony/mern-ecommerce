const express = require('express')
const {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getMyOrders,
  deleteOrder,
  updateOrderStatus,
} = require('../controllers/orderController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/orders').post(isAuthenticated, createOrder)
router.route('/orders').get(isAuthenticated, getMyOrders)
router
  .route('/admin/orders')
  .get(isAuthenticated, authorizeRoles('admin'), getAllOrders)
router
  .route('/admin/orders/:id')
  .get(isAuthenticated, authorizeRoles('admin'), getSingleOrder)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteOrder)
  .put(isAuthenticated, authorizeRoles('admin'), updateOrderStatus)
module.exports = router
