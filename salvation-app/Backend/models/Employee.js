const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const EmployeeSchema=new mongoose.Schema({
  employeeId:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  role:{type:String,default:"employee"}
});

EmployeeSchema.pre("save",async function(){
  if(!this.isModified("password"))return;
  this.password=await bcrypt.hash(this.password,10);
});

module.exports=mongoose.model("Employee",EmployeeSchema);
