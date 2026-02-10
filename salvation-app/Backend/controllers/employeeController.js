const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const { uploadToS3 } = require("../utills/uploadToS3");
const { getSignedUrlFromKey } = require("../utills/getSignedUrlFromKey");

const EMPLOYEE_UPLOAD_FIELDS = [
  "aadhaar",
  "pan",
  "bankPassbook",
  "marksheet10",
  "marksheet12",
  "profilePhoto",
  "graduation"
];

const ADMIN_UPLOAD_FIELDS = [
  "offerLetter",
  "appointmentLetter",
  "uanLetter",
  "esicSlip",
  "salarySlip"
];

/* ================= SEND OTP ================= */
exports.sendOtp = async (req,res)=>{
  try{
    const { employeeId, loginMobile } = req.body;

    if(!employeeId || !loginMobile){
      return res.status(400).json({ message:"Employee ID & mobile required" });
    }

    // ✅ Only generate OTP (NO DB CREATE)
    const otp = "123456"; // static for now

    console.log(`📨 OTP for ${employeeId}:`, otp);

    // 👉 Later: send SMS here
    res.json({
      success:true,
      message:"OTP sent successfully"
    });

  }catch(err){
    console.error("🔥 sendOtp error:",err);
    res.status(500).json({ message:"Server error" });
  }
};


/* ================= VERIFY OTP ================= */
exports.verifyOtp = async (req,res)=>{
  try{
    const { employeeId, otp, loginMobile } = req.body;

    if(!employeeId || !otp){
      return res.status(400).json({ message:"Employee ID & OTP required" });
    }

    // ❌ TEMP OTP CHECK (replace with real check later)
    if(otp !== "123456"){
      return res.status(401).json({ message:"Invalid OTP" });
    }

    let employee = await Employee.findOne({ employeeId });

    /* ================= CREATE ONLY AFTER VERIFY ================= */
    if(!employee){
      employee = await Employee.create({
        employeeId,
        loginMobile,
        otpVerified:true,
        loginAt:new Date(),
        lastLoginAt:new Date()
      });
      console.log("🆕 Employee created after OTP verify:", employeeId);
    }else{
      employee.otpVerified = true;
      employee.lastLoginAt = new Date();
      await employee.save();
      console.log("🔁 Employee login updated:", employeeId);
    }

    /* ================= JWT ================= */
    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn:"1d" }
    );

    res.json({
      success:true,
      token,
      employeeId: employee.employeeId
    });

  }catch(err){
    console.error("🔥 verifyOtp error:",err);
    res.status(500).json({ message:"Server error" });
  }
};


/* ================= GET PROFILE ================= */
exports.getEmployeeProfile = async (req,res)=>{
  try{
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ employeeId });
    if(!employee){
      return res.status(404).json({ message:"Employee not found" });
    }

    res.json({ success:true, employee });

  }catch(err){
    res.status(500).json({ message:"Server error" });
  }
};


/* ================= UPDATE PROFILE (WITH PROFILE PHOTO) ================= */
exports.updateEmployeeProfile = async(req,res)=>{
  try{
    const { employeeId } = req.params;
    const { fullName,fatherName,mobile,address } = req.body;

    const employee = await Employee.findOne({ employeeId });
    if(!employee){
      return res.status(404).json({ message:"Employee not found" });
    }

    /* ---------- UPDATE BASIC FIELDS ---------- */
    if(fullName !== undefined) employee.fullName = fullName;
    if(fatherName !== undefined) employee.fatherName = fatherName;
    if(mobile !== undefined) employee.mobile = mobile;
    if(address !== undefined) employee.address = address;

    /* ---------- UPLOAD PROFILE PHOTO ---------- */
    if(req.files?.profilePhoto?.[0]){
      const s3Key = await uploadToS3(
        req.files.profilePhoto[0],
        {
          module:"employee",
          documentType:"profilePhoto",
          name:employee.fullName || employee.employeeId,
          id:employee.employeeId
        }
      );

      employee.employeeUploads.profilePhoto = s3Key;
    }

    await employee.save();

    res.json({
      success:true,
      message:"Profile updated successfully",
      employee
    });

  }catch(err){
    console.error("🔥 updateEmployeeProfile:",err);
    res.status(500).json({ message:"Server error" });
  }
};
exports.uploadEmployeeDocuments = async(req,res)=>{
  try{
    let { employeeId } = req.params;

    // ✅ normalize employeeId
    if(Array.isArray(employeeId)){
      employeeId = employeeId[0];
    }

    console.log("UPLOAD employeeId:", employeeId);

    const employee = await Employee.findOne({ employeeId });

    if(!employee){
      return res.status(404).json({ message:"Employee not found" });
    }
    if(!employee){
      return res.status(404).json({ message:"Employee not found" });
    }

    if(!req.files){
      return res.status(400).json({ message:"No files uploaded" });
    }

    for(const field of EMPLOYEE_UPLOAD_FIELDS){
      if(req.files[field]?.[0]){
        const s3Key = await uploadToS3(
          req.files[field][0],
          {
            module:"employee",
            documentType:field,
            name:employee.fullName || employee.employeeId,
            id:employee.employeeId
          }
        );

        employee.employeeUploads[field] = s3Key;
      }
    }

    await employee.save();

    res.json({
      success:true,
      message:"Employee documents uploaded",
      employeeUploads:employee.employeeUploads
    });

  }catch(err){
    console.error("🔥 uploadEmployeeDocuments:",err);
    res.status(500).json({ message:"Server error" });
  }
};
exports.uploadAdminDocuments = async(req,res)=>{
  try{
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ employeeId });
    if(!employee){
      return res.status(404).json({ message:"Employee not found" });
    }

    if(!req.files){
      return res.status(400).json({ message:"No files uploaded" });
    }

    for(const field of ADMIN_UPLOAD_FIELDS){
      if(req.files[field]?.[0]){

        if(field === "salarySlip"){
          const s3Key = await uploadToS3(
            req.files[field][0],
            {
              module:"admin",
              documentType:"salarySlip",
              name:employee.fullName || employee.employeeId,
              id:employee.employeeId
            }
          );

          employee.companyUploads.salarySlips.push(s3Key);
        }else{
          const s3Key = await uploadToS3(
            req.files[field][0],
            {
              module:"admin",
              documentType:field,
              name:employee.fullName || employee.employeeId,
              id:employee.employeeId
            }
          );

          employee.companyUploads[field] = s3Key;
        }
      }
    }

    await employee.save();

    res.json({
      success:true,
      message:"Admin documents uploaded",
      companyUploads:employee.companyUploads
    });

  }catch(err){
    console.error("🔥 uploadAdminDocuments:",err);
    res.status(500).json({ message:"Server error" });
  }
};
exports.getEmployeeDocuments = async(req,res)=>{
  try{
    let { employeeId } = req.params;

    // ✅ normalize (VERY IMPORTANT)
    if(Array.isArray(employeeId)){
      employeeId = employeeId[0];
    }

    if(!employeeId){
      return res.status(400).json({ message:"Employee ID missing" });
    }

    console.log("📄 Fetch docs for:", employeeId);

    const employee = await Employee.findOne({ employeeId });

    if(!employee){
      return res.status(404).json({ message:"Employee not found" });
    }

    const employeeDocs = employee.employeeUploads || {};
    const companyDocs = employee.companyUploads || {};

    const response = {
      personal:{
        aadhaar: await getSignedUrlFromKey(employeeDocs.aadhaar),
        pan: await getSignedUrlFromKey(employeeDocs.pan),
        bankPassbook: await getSignedUrlFromKey(employeeDocs.bankPassbook),
        marksheet10: await getSignedUrlFromKey(employeeDocs.marksheet10),
        marksheet12: await getSignedUrlFromKey(employeeDocs.marksheet12),
        profilePhoto: await getSignedUrlFromKey(employeeDocs.profilePhoto),
        graduation: await getSignedUrlFromKey(employeeDocs.graduation)
      },
      letters:{
        offerLetter: await getSignedUrlFromKey(companyDocs.offerLetter),
        appointmentLetter: await getSignedUrlFromKey(companyDocs.appointmentLetter)
      },
      government:{
        uanLetter: await getSignedUrlFromKey(companyDocs.uanLetter),
        esicSlip: await getSignedUrlFromKey(companyDocs.esicSlip)
      },
      salarySlips:[]
    };

    if(companyDocs.salarySlips?.length){
      for(const key of companyDocs.salarySlips){
        response.salarySlips.push(await getSignedUrlFromKey(key));
      }
    }

    res.json({ success:true, documents:response });

  }catch(err){
    console.error("🔥 getEmployeeDocuments:",err);
    res.status(500).json({ message:"Server error" });
  }
};
// ================= GET EMPLOYEE PROFILE PHOTO =================
exports.getEmployeeProfilePhoto = async (req, res) => {
  try {
    console.log("📸 getEmployeeProfilePhoto called with params:", req.params);
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID missing" });
    }

    const employee = await Employee.findOne({ employeeId }).select(
      "employeeUploads.profilePhoto"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const key = employee.employeeUploads?.profilePhoto;

    if (!key) {
      return res.json({
        success: true,
        profilePhoto: null
      });
    }

    const imageUrl = `${process.env.S3_BASE_URL}/${key}`;

    return res.json({
      success: true,
      profilePhoto: imageUrl
    });

  } catch (error) {
    console.error("🔥 getEmployeeProfilePhoto:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
