
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");

const { transporter } = require("./utils/sendEmail");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();

// CORS CONFIGURATION
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://exportyard.com",
      "https://www.exportyard.com",
    ],
  })
);

// MIDDLEWARE
app.use(express.json({ limit: "10kb" }));

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ExportYard backend is running!",
  });
});

// HEALTH CHECK ROUTE
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
    email: "Zoho SMTP configured",
  });
});

// API ROUTES
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enquiries", enquiryRoutes);

// START SERVER
const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    console.log("MongoDB connected successfully!");
    console.log(`Connected database: ${mongoose.connection.name}`);

    // Verify Zoho SMTP
    try {
      await transporter.verify();
      console.log("Zoho SMTP connected successfully!");
    } catch (emailError) {
      console.error(
        "Zoho SMTP connection failed:",
        emailError.message
      );
    }

    // Start Express server
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
