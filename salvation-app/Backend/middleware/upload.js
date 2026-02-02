const multer = require("multer");

console.log("🔵 Initializing Multer (memory storage)");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 3 MB max
  }
});


module.exports = upload;
