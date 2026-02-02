const express = require("express");
const drive = require("../config/googleDrive");

const router = express.Router();

router.get("/drive-test", async (req, res) => {
  try {
    console.log("🧪 Drive test started");

    const result = await drive.files.list({
      pageSize: 1,
      fields: "files(id, name)"
    });

    console.log("🟢 Drive list success:", result.data.files);
    res.json({ success: true, files: result.data.files });

  } catch (err) {
    console.error("❌ Drive list failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
