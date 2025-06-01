const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controller/authController");
// const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();
// Route for user registration
router.post("/register", registerUser);
// Route for user login
router.post("/login", loginUser);
// Route for getting user info
router.get("/user", protect, getUserInfo);

module.exports = router;
