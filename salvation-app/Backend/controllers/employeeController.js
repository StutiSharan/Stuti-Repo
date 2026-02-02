const Employee=require("../models/Employee");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.loginEmployee=async(req,res)=>{
  try{
    const {employeeId,password}=req.body;

    const employee=await Employee.findOne({employeeId});
    if(!employee){
      return res.status(401).json({message:"Invalid credentials"});
    }

    const isMatch=await bcrypt.compare(password,employee.password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid credentials"});
    }

    const token=jwt.sign(
      {id:employee._id,role:employee.role},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({token});
  }catch(err){
    res.status(500).json({message:"Server Error"});
  }
};
