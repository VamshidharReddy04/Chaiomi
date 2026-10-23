// Application routes
const express = require("express");
const multer = require("multer");

const { createApplication } = require("../controllers/applicationController");

// Router for application-related endpoints
const router = express.Router();

// Resume files
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory for processing
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF and Word documents are allowed.",
        ),
      );
    }
  },
});

router.post("/", upload.single("resume"), createApplication);

module.exports = router;
