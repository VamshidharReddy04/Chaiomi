// APP.JS for backend EXPRESS CONFIGURATION
// SECURITY MIDDLEWARES ROUTES

require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();
// Security Handlers
app.use(helmet()); // Set security-related HTTP headers

// Allows cross-origin requests from the frontend.
// Frontend url need configuration in backend/.env file. If not set, it defaults to localhost for local development.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// General rate limiting to prevent abuse & brute-force attacks
const Limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(Limiter);

app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Log HTTP requests

// TEST ROUTE GET http://localhost:5000/
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Chaiomi API!",
  });
});

// Contact route - Emails the message , no Database storage for contact messages
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// Careers/applications route - Emails application(resume attachment)
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

// Franchise route - Emails franchise inquiry submissions
const franchiseRoutes = require("./routes/franchiseRoutes");
app.use("/api/franchise", franchiseRoutes);

// Return a clear response for unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler for unhandled errors.
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError || err.message?.startsWith("Invalid file type")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
