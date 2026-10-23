// CONTACT CONTROLLER

// Handles contact from submissions
const validator = require("validator");
const sendEmail = require("../utils/mailer");
const { appendRow } = require("../utils/googleSheets.js");

// POST /api/contact
const createContact = async (req, res) => {
  try {
    let { name, email, phone, subject, message } = req.body;

    // Remove extra spaces from name and message
    name = name?.trim();
    email = email?.trim();
    phone = phone?.trim() || "Not provided";
    subject = subject?.replace(/[\r\n]+/g, " ").trim() || "General Inquiry";
    message = message?.trim();

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Email validation using validator library
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Length validation for name and message
    if (name.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Name is too long",
      });
    }
    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long",
      });
    }

    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
      console.error(
        "Contact email is not configured. Set EMAIL_USERNAME and EMAIL_PASSWORD in backend/.env.",
      );
      return res.status(503).json({
        success: false,
        message:
          "Contact messages are temporarily unavailable because email delivery is not configured.",
      });
    }

    // Save to Google Sheet without preventing the email from being sent if Sheets is unavailable.
    try {
      await appendRow("Inquiries", [
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        name,
        email,
        phone,
        subject,
        message,
      ]);
    } catch (sheetError) {
      console.error("Google Sheet error (Inquiries):", sheetError.message);
    }

    await sendEmail.sendMail({
      from: `"Chaiomi Contact Form" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USERNAME,
      replyTo: email, // Reply to the user's email
      subject: `Contact Form: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while sending your message. Please try again later.",
    });
  }
};

module.exports = {
  createContact,
};
