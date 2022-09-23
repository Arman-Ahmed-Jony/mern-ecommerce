const express = require('express')
const { createOrder } = require('../controllers/orderController')
const { isAuthenticated } = require('../middleware/auth')
const router = express.Router()

router.route('/order').post(isAuthenticated, createOrder)

module.exports = router
