
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google account",
      });
    }

    if (!payload.email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google email is not verified",
      });
    }

    const {
      sub: googleId,
      email,
      name,
      picture,
    } = payload;

    const normalizedEmail = email.trim().toLowerCase();

    // Find existing account
    let user = await User.findOne({
      $or: [
        { googleId },
        { email: normalizedEmail },
      ],
    });

    let isNewUser = false;

    if (user) {
      // Link Google to an existing account
      if (!user.googleId) {
        user.googleId = googleId;
      }

      if (!user.profilePicture && picture) {
        user.profilePicture = picture;
      }

      await user.save();

    } else {
      // Create a new Google account
      user = await User.create({
        name: name || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        googleId,
        authProvider: "google",
        profilePicture: picture || "",
      });

      isNewUser = true;
    }

    // Send welcome email only to newly created accounts
    if (isNewUser) {
      try {
        await sendWelcomeEmail(user);

        console.log(
          "Google registration welcome email sent:",
          user.email
        );

      } catch (emailError) {
        console.error(
          "Google welcome email failed:",
          emailError.message
        );
      }
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from .env");
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Account already exists. Please try again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

module.exports = { googleAuth };
