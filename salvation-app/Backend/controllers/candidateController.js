const Candidate = require("../models/Candidate");
const { uploadToS3 } = require("../utills/uploadToS3");
const mongoose = require("mongoose");

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

    /* ---------- SEQUENTIAL CANDIDATE ID ---------- */
    const counter = await Counter.findOneAndUpdate(
      { name:"candidate" },
      { $inc:{ seq:1 } },
      { new:true, upsert:true }
    );

    const candidateId = `CAND-${counter.seq
      .toString()
      .padStart(4,"0")}`;

    let resumeFilePath="";
    let aadhaarFilePath="";

    /* ---------- UPLOAD RESUME TO S3 ---------- */
    if(req.files?.resume?.[0]){
      resumeFilePath = await uploadToS3(
        req.files.resume[0],
        {
          module:"candidate",
          documentType:"resume",
          name:fullName,
          id:candidateId
        }
      );
    }

    /* ---------- UPLOAD AADHAAR TO S3 ---------- */
    if(req.files?.aadhaar?.[0]){
      aadhaarFilePath = await uploadToS3(
        req.files.aadhaar[0],
        {
          module:"candidate",
          documentType:"aadhaar",
          name:fullName,
          id:candidateId
        }
      );
    }

    /* ---------- SAVE CANDIDATE ---------- */
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

    res.status(201).json({ success:true, candidate });

  }catch(err){
    console.error("🔥 Error:",err);
    res.status(500).json({ message:"Server error" });
  }
};

exports.getCandidateByMobile = async(req,res)=>{
  try{
    let mobile = req.params.mobile;

    // normalize to 10 digits
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
