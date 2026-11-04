const crypto = require("crypto");
const User = require("../models/user");
const Otp = require("../models/otp");
const hash = require("../utils/hash");
const sendOtpEmail = require("../utils/sendOtpEmail");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");

const cleanEmail = (v) => (typeof v === "string" ? v.trim().toLowerCase() : "");

// POST /api/users/send-signup-otp
const sendSignupOtp = async (req, res) => {
  try {
    const email = cleanEmail(req.body.email);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({ success: false, message: "Email is already registered" });
    }

    const existing = await Otp.findOne({ email });
    if (existing && Date.now() - existing.createdAt.getTime() < 60 * 1000) {
      return res.status(429).json({ success: false, message: "Please wait a minute before requesting another OTP" });
    }

    const otp = String(crypto.randomInt(100000, 1000000));

    await Otp.findOneAndUpdate(
      { email },
      {
        otpHash: hash(otp),
        attempts: 0,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      { upsert: true, setDefaultsOnInsert: true }
    );

    await sendOtpEmail(email, otp);

    return res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Send OTP error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to send OTP" });
  }
};

// POST /api/users/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const email = cleanEmail(req.body.email);

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");

      // updateOne avoids running the User pre-validate hook (password isn't selected here)
      await User.updateOne(
        { _id: user._id },
        {
          resetPasswordToken: hash(token),
          resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
        }
      );

      const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

      try {
        await sendResetPasswordEmail(user, link);
      } catch (emailError) {
        console.error("Reset email failed:", emailError.message);
      }
    }

    // Same response whether or not the email exists (prevents account enumeration)
    return res.status(200).json({
      success: true,
      message: "If that email is registered, a reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to process request" });
  }
};

// POST /api/users/reset-password/:token
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (typeof password !== "string" || password.length < 8 || password.length > 72) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 72 characters",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: hash(req.params.token),
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Reset link is invalid or has expired" });
    }

    user.password = password; // hashed by the pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated. You can now log in." });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to reset password" });
  }
};

module.exports = { sendSignupOtp, forgotPassword, resetPassword };