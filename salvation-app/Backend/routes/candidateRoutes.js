const express=require("express");
const upload=require("../middleware/upload");
const {createCandidate}=require("../controllers/candidateController");

const router=express.Router();

console.log("🟢 Candidate routes initialized");

/**
 * POST /api/candidates/create-candidate
 * Creates candidate
 * Uploads resume + aadhaar to Google Drive
 * Saves file paths + candidateId in MongoDB
 */
router.post(
  "/create-candidate",
  upload.fields([
    {name:"resume",maxCount:1},
    {name:"aadhaar",maxCount:1}
  ]),
  createCandidate
);

module.exports=router;
