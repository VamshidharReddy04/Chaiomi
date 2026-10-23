// FRANCHISE CONTROLLER

// Validation library, already used elsewhere in this backend
const validator = require("validator");

// POST /api/franchise
const createFranchiseInquiry = async (req, res) => {
  try {
    let { name, email, phone, city, investmentBudget, message } = req.body;

    // Remove extra spaces from every text field
    name = name?.trim();
    email = email?.trim();
    phone = phone?.trim();
    city = city?.trim();
    investmentBudget = investmentBudget?.trim();
    message = message?.trim();

    // Validate required fields
    if (!name || !email || !phone || !city) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, and city are required",
      });
    }

    // Email validation using the same library the contact form uses
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Length validation, matching the model's maxlength limits
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name is too long",
      });
    }
    if (message && message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long",
      });
    }

    // Create a new franchise inquiry document
    const newInquiry = new FranchiseInquiry({
      name,
      email,
      phone,
      city,
      investmentBudget,
      message,
    });

    // Save to database
    await newInquiry.save();

    // Success response
    return res.status(201).json({
      success: true,
      message: "Franchise inquiry submitted successfully",
      data: newInquiry,
    });
  } catch (error) {
    console.error("Error submitting franchise inquiry:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while submitting your inquiry. Please try again later.",
    });
  }
};

module.exports = {
  createFranchiseInquiry,
};
