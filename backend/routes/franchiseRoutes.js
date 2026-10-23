// FRANCHISE ROUTES

// handles /api/franchise routes
const express = require("express");
const router = express.Router();
const {
  createFranchiseInquiry,
} = require("../controllers/franchiseController");

// POST Save franchise inquiry
router.post("/", createFranchiseInquiry);

module.exports = router;
