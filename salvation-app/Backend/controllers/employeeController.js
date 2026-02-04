const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");

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


/* ================= UPDATE PROFILE ================= */
exports.updateEmployeeProfile = async (req,res)=>{
  try{
    const { employeeId } = req.params;
    const { fullName,fatherName,mobile,address } = req.body;

    const employee = await Employee.findOneAndUpdate(
      { employeeId },
      { fullName,fatherName,mobile,address },
      { new:true }
    );

    if(!employee){
      return res.status(404).json({ message:"Employee not found" });
    }

    res.json({ success:true, employee });

  }catch(err){
    console.error("🔥 updateEmployeeProfile:",err);
    res.status(500).json({ message:"Server error" });
  }
};
