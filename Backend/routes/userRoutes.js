const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");
const { googleAuth } = require("../controllers/googleAuthController");
const { sendSignupOtp, forgotPassword, resetPassword } = require("../controllers/authExtrasController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Email & Password Authentication
router.post("/send-signup-otp", sendSignupOtp);
router.post("/register", registerUser);
router.post("/login", loginUser);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Google Authentication (still used on Login)
router.post("/google-auth", googleAuth);

// Get Logged-in User
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;