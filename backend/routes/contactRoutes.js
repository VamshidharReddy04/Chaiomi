//  CONTACT ROUTES

// handles /api/contact routes
const express = require("express");
const router = express.Router();
const { createContact } = require("../controllers/contactController");

// POST Save contact form
router.post("/", createContact);

module.exports = router;
