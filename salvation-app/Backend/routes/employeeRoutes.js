const express = require("express");
const {
  sendOtp,
  verifyOtp,
  getEmployeeProfile,
  updateEmployeeProfile
} = require("../controllers/employeeController");

const router = express.Router();

/* AUTH */
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

/* PROFILE */
router.get("/profile/:employeeId", getEmployeeProfile);
router.put("/profile/:employeeId", updateEmployeeProfile);

module.exports = router;
