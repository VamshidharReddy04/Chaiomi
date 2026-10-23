// Application Controller

// Handles job application submissions from career page
// Saves application to Google Sheet (with resume in Google Drive)
// Sends email with application details and resume attachment

const validator = require("validator");
const sendEmail = require("../utils/mailer");
const { appendRow } = require("../utils/googleSheets");

// POST /api/applications
const createApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      experience,
      previousCtc,
      expectedCtc,
      noticePeriod,
      coverLetter,
    } = req.body;
    const resume = req.file; // Resume uploaded through multer (memoryStorage)

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !role?.trim() ||
      !experience?.trim() ||
      !previousCtc?.trim() ||
      !expectedCtc?.trim() ||
      !noticePeriod?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    // Validate resume file
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    // Make sure multer is using memoryStorage (buffer must exist)
    if (!resume.buffer) {
      console.error(
        "Resume buffer missing. Use multer.memoryStorage() in your route.",
      );
      return res.status(500).json({
        success: false,
        message: "Resume could not be processed. Please try again.",
      });
    }

    if (
      !process.env.EMAIL_USERNAME ||
      !process.env.EMAIL_PASSWORD ||
      !process.env.CAREERS_EMAIL
    ) {
      console.error(
        "Application email is not configured. Set EMAIL_USERNAME, EMAIL_PASSWORD, and CAREERS_EMAIL in backend/.env.",
      );
      return res.status(503).json({
        success: false,
        message:
          "Applications are temporarily unavailable because email delivery is not configured.",
      });
    }

    const safeResumeName = resume.originalname
      .replace(/[^\w.-]+/g, "_")
      .slice(0, 150);

    // Save to Google Sheet without preventing the email from being sent if Sheets is unavailable.
    try {
      const sheetResult = await appendRow(
        "Jobs",
        [
          new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          name.trim(),
          email.trim(),
          phone.trim(),
          role.trim(),
          experience.trim(),
          previousCtc.trim(),
          expectedCtc.trim(),
          noticePeriod.trim(),
          coverLetter?.trim() || "",
        ],
        {
          name: `${Date.now()}-${safeResumeName}`,
          mimeType: resume.mimetype,
          base64: resume.buffer.toString("base64"),
        },
      );

      console.log("Google Sheet application saved:", {
        success: sheetResult?.success,
        version: sheetResult?.version,
        fileUrl: sheetResult?.fileUrl || null,
        fileError: sheetResult?.fileError || null,
      });
    } catch (sheetError) {
      console.error("Google Sheet error (Jobs):", {
        message: sheetError.message,
        cause: sheetError.cause?.message,
      });
    }

    // Send the application email
    await sendEmail.sendMail({
      from: `"Chaiomi Careers"<${process.env.EMAIL_USERNAME}>`, // sender address
      to: process.env.CAREERS_EMAIL, // list of receivers
      replyTo: email, // Reply to the applicant's email
      subject: `New Job Application for ${role.trim()} - ${name.trim()}`, // Subject line
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        `Role: ${role.trim()}`,
        `Experience: ${experience.trim()}`,
        previousCtc?.trim() ? `Previous CTC: ${previousCtc.trim()}` : null,
        `Expected CTC: ${expectedCtc.trim()}`,
        `Notice Period: ${noticePeriod.trim()}`,
        coverLetter?.trim() ? `Cover Letter: ${coverLetter.trim()}` : null,
      ]
        .filter(Boolean) // Remove null values
        .join("\n"), // Join with new lines
      attachments: [
        {
          filename: resume.originalname,
          content: resume.buffer,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the application.",
    });
  }
};

module.exports = {
  createApplication,
};
