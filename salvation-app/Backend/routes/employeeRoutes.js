const express = require("express");
const upload = require("../middleware/upload");

const {
	sendOtp,
	verifyOtp,
	getEmployeeProfile,
	updateEmployeeProfile,
	uploadEmployeeDocuments,
	uploadAdminDocuments,
  getEmployeeDocuments,
  getEmployeeProfilePhoto,
} = require("../controllers/employeeController");

const router = express.Router();

/* ================= AUTH ================= */
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

/* ================= PROFILE ================= */
// GET profile
router.get("/profile/:employeeId", getEmployeeProfile);
router.get(
  "/documents/:employeeId",
  getEmployeeDocuments
);


// UPDATE profile + profile photo
router.put(
	"/profile/:employeeId",
	upload.fields([
		{ name:"profilePhoto", maxCount:1 }
	]),
	updateEmployeeProfile
);

/* ================= EMPLOYEE SELF UPLOAD ================= */
/*
Employee can upload:
aadhaar
pan
bankPassbook
marksheet10
marksheet12
profilePhoto
graduation
*/
router.post(
	"/upload/employee/:employeeId",
	upload.fields([
		{ name:"aadhaar", maxCount:1 },
		{ name:"pan", maxCount:1 },
		{ name:"bankPassbook", maxCount:1 },
		{ name:"marksheet10", maxCount:1 },
		{ name:"marksheet12", maxCount:1 },
		{ name:"profilePhoto", maxCount:1 },
		{ name:"graduation", maxCount:1 }
	]),
	uploadEmployeeDocuments
);

/* ================= ADMIN UPLOAD ================= */
/*
Admin can upload:
offerLetter
appointmentLetter
uanLetter
esicSlip
salarySlip (multiple times)
*/
router.post(
	"/upload/admin/:employeeId",
	upload.fields([
		{ name:"offerLetter", maxCount:1 },
		{ name:"appointmentLetter", maxCount:1 },
		{ name:"uanLetter", maxCount:1 },
		{ name:"esicSlip", maxCount:1 },
		{ name:"salarySlip", maxCount:1 }
	]),
	uploadAdminDocuments
);
router.get(
  "/profile-photo/:employeeId",
  getEmployeeProfilePhoto
);
module.exports = router;
