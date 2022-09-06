const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateUser,
} = require("../controllers/userController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

// router.route("/products").get(getAllProducts)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router
  .route("/user/me")
  .get(isAuthenticated, getUserDetails)
  .put(isAuthenticated, updateUser);
router.route("/password/change").put(isAuthenticated, changePassword);

module.exports = router;
