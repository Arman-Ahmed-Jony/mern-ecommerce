const express = require("express");
const router = express.Router();
const {registerUser} = require('../controllers/userController');

// router.route("/products").get(getAllProducts)
router.route("/register").post(registerUser)
// router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)

module.exports = router