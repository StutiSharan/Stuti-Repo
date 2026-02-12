const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
{
  /* ================= BASIC INFO ================= */
  employeeId:{
    type:String,
    unique:true,
    required:true
  },
  role:{
    type:String,
    default:"employee"
  },
  fullName:{
    type:String,
    default:""
  },
  fatherName:{
    type:String,
    default:""
  },
  mobile:{
    type:String,
    default:""
  },
  address:{
    type:String,
    default:""
  },
  profilePhoto:{
      type:String,
      default:""
    },
  /* ================= LOGIN / OTP ================= */
  loginMobile:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    default:""
  },
  otpVerified:{
    type:Boolean,
    default:false
  },
  loginAt:{
    type:Date
  },
  lastLoginAt:{
    type:Date
  },

  /* ================= EMPLOYEE SELF UPLOADS ================= */
  employeeUploads:{
    aadhaar:{
      type:String,
      default:""
    },
    pan:{
      type:String,
      default:""
    },
    bankPassbook:{
      type:String,
      default:""
    },
    marksheet12:{
      type:String,
      default:""
    },
  
    graduation:{
      type:String,
      default:""
    }
  },

  /* ================= ADMIN / COMPANY UPLOADS ================= */
  companyUploads:{
    offerLetter:{
      type:String,
      default:""
    },
    appointmentLetter:{
      type:String,
      default:""
    },
    uanLetter:{
      type:String,
      default:""
    },
    esicSlip:{
      type:String,
      default:""
    },
    salarySlips:{
      type:[String],
      default:[]
    }
  }

},
{
  timestamps:true
});

module.exports = mongoose.model("Employee",EmployeeSchema,"employees");
