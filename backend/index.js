require("dotenv").config({ quiet: true }); // Load environment variables from .env file
// Import the Express app from app.js
const app = require("./app");

// Port configuration
const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Chaiomi API listening on port ${port}`);
  // Check for missing email configuration and log a warning if any are missing
  const missingEmailConfig = [
    "EMAIL_USERNAME",
    "EMAIL_PASSWORD",
    "CAREERS_EMAIL",
  ].filter((name) => !process.env[name]);
  // Log a warning if any required email configuration variables are missing
  if (missingEmailConfig.length > 0) {
    console.warn(
      `Email delivery is not configured. Missing: ${missingEmailConfig.join(", ")}`,
    );
  }
});
