// Shared email sending function we can send the email directly to the recipient using nodemailer.

const nodemailer = require("nodemailer");

const sendEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD?.replace(/\s+/g, ""),
  },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 10000,
});

module.exports = sendEmail;
