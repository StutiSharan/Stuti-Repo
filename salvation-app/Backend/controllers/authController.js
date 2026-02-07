const LoginData=require("../models/LoginData");
const jwt=require("jsonwebtoken");
// const axios=require("axios"); // for Fast2SMS later

// STEP 1: SEND OTP
exports.sendOtp=async(req,res)=>{
  try{
    const {fullName,phone}=req.body;

    if(!fullName||!phone){
      return res.status(400).json({message:"Full name and phone required"});
    }

    // STATIC OTP FOR NOW
    const otp="123456";

    // 🔁 Fast2SMS integration (ENABLE LATER)
    /*
    await axios.post("https://www.fast2sms.com/dev/bulkV2",{
      route:"otp",
      numbers:phone,
      message:`Your OTP is ${otp}`
    },{
      headers:{
        authorization:process.env.FAST2SMS_API_KEY
      }
    });
    */

    let loginData=await LoginData.findOne({phone});

    if(!loginData){
      loginData=await LoginData.create({
        fullName,
        phone,
        otpStatus:"pending"
      });
    }

    res.json({message:"OTP sent successfully"});
  }catch(err){
    res.status(500).json({message:"Server error"});
  }
};

// STEP 2: VERIFY OTP
exports.verifyOtp=async(req,res)=>{
  try{
    const {phone,otp}=req.body;

    // STATIC OTP CHECK
    if(otp!=="123456"){
      return res.status(401).json({message:"Invalid OTP"});
    }

    const loginData=await LoginData.findOne({phone});
    if(!loginData){
      return res.status(404).json({message:"User not found"});
    }

    loginData.otpStatus="verified";
    loginData.loginAt=new Date();
    loginData.lastLoggedInAt=new Date();
    await loginData.save();

    const token=jwt.sign(
      {id:loginData._id,phone:loginData.phone},
      process.env.JWT_SECRET,
      {expiresIn:"3d"}
    );

    res.json({
      message:"Login successful",
      token
    });
  }catch(err){
    res.status(500).json({message:"Server error"});
  }
};
