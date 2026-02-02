const { google } = require("googleapis");

console.log("🔵 Initializing Google Drive Auth...");

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/drive"]
});

// 🔴 ADD THIS
auth.getClient().then(() => {
  console.log("🟢 Google Auth client acquired");
}).catch(err => {
  console.error("❌ Google Auth failed:", err.message);
});

const drive = google.drive({
  version: "v3",
  auth
});

console.log("🟢 Google Drive instance created");

module.exports = drive;
