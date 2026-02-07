const Candidate = require("../models/Candidate");
const { uploadToDrive } = require("../utills/driveUpload");
const path = require("path");
const mongoose = require("mongoose");

/* ================== COUNTER (INLINE) ================== */
const CounterSchema = new mongoose.Schema({
  name:{type:String,unique:true},
  seq:{type:Number,default:0}
});
const Counter =
  mongoose.models.Counter ||
  mongoose.model("Counter",CounterSchema);

/* ================== CREATE CANDIDATE ================== */
exports.createCandidate = async(req,res)=>{
  try{
    console.log("📥 Create Candidate API called");

    const { fullName,fatherName,address,mobile } = req.body;

    /* ---------- SEQUENTIAL CANDIDATE ID (ONLY CHANGE) ---------- */
    const counter = await Counter.findOneAndUpdate(
      {name:"candidate"},
      {$inc:{seq:1}},
      {new:true,upsert:true}
    );

    const candidateId = `CAND-${counter.seq
      .toString()
      .padStart(4,"0")}`;

    console.log("🆔 Generated Candidate ID:",candidateId);

    /* ---------- REST CODE UNCHANGED ---------- */
    let resumeFilePath="";
    let aadhaarFilePath="";

    if(req.files?.resume?.[0]){
      const ext = path.extname(req.files.resume[0].originalname);
      const name =
        `${fullName.replace(/\s+/g,"_")}_${candidateId}_Resume${ext}`;

      await uploadToDrive(
        req.files.resume[0],
        process.env.GOOGLE_DRIVE_RESUME_FOLDER_ID,
        name
      );

      resumeFilePath = `uploads/newCandidate/resume/${name}`;
    }

    if(req.files?.aadhaar?.[0]){
      const ext = path.extname(req.files.aadhaar[0].originalname);
      const name =
        `${fullName.replace(/\s+/g,"_")}_${candidateId}_Aadhaar${ext}`;

      await uploadToDrive(
        req.files.aadhaar[0],
        process.env.GOOGLE_DRIVE_AADHAR_FOLDER_ID,
        name
      );

      aadhaarFilePath = `uploads/newCandidate/aadhaar/${name}`;
    }

    const candidate = await Candidate.create({
      candidateId,
      fullName,
      fatherName,
      address,
      mobile,
      resumeFilePath,
      aadhaarFilePath
    });

    console.log("🎉 Candidate saved");

    res.status(201).json({success:true,candidate});

  }catch(err){
    console.error("🔥 Error:",err);
    res.status(500).json({message:"Server error"});
  }
};
exports.getCandidateByMobile = async(req,res)=>{
  try{
    let mobile = req.params.mobile;

    // ✅ normalize to 10 digits
    if(mobile.startsWith("+91")){
      mobile = mobile.slice(3);
    }

    const candidate = await Candidate.findOne({ mobile });

    if(!candidate){
      return res.status(404).json({ message:"Not found" });
    }

    res.json({ candidate });

  }catch(err){
    res.status(500).json({ message:"Server error" });
  }
};

