// Saves a row to Google Sheets through the Apps Script web app.
// When provided, file is saved to Drive by Apps Script and its link is appended.
const appendRow = async (tab, values, file) => {
  const { GOOGLE_SCRIPT_URL, GOOGLE_SCRIPT_SECRET } = process.env;

  if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_SECRET) {
    console.warn("Google Sheets is not configured. Skipping sheet save.");
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  let res;
  try {
    res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: GOOGLE_SCRIPT_SECRET,
        tab,
        values,
        ...(file ? { file } : {}),
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  const responseBody = await res.text();
  let result;
  try {
    result = JSON.parse(responseBody);
  } catch {
    throw new Error(
      `Google Sheets returned an invalid response with status ${res.status}`,
    );
  }

  if (!res.ok) {
    throw new Error(
      result.error || `Google Sheets request failed with status ${res.status}`,
    );
  }

  if (!result.success) {
    throw new Error(result.error || "Sheet save failed");
  }

  if (file && !result.fileUrl) {
    console.error("Google Sheets response missing fileUrl:", result);
    throw new Error(
      "Google Sheets accepted the row but did not return a Drive file URL. Redeploy the Apps Script with file upload support.",
    );
  }

  return result;
};

module.exports = { appendRow };
