const mongoose=require("mongoose");

const EmployeeSchema=new mongoose.Schema({

  /* ---------- AUTH / LOGIN ---------- */
  employeeId:{
    type:String,
    required:true,
    unique:true
  },

  loginMobile:{
    type:String,
    required:true   // mobile used for OTP login
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
    type:Date       // first successful login
  },

  lastLoginAt:{
    type:Date       // every login update
  },

  role:{
    type:String,
    default:"employee"
  },

  /* ---------- PROFILE DETAILS ---------- */
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
    type:String,    // Drive path / filename
    default:""
  },

  /* ---------- EMPLOYEE UPLOADED DOCUMENTS ---------- */
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
    marksheet10:{
      type:String,
      default:""
    },
    marksheet12:{
      type:String,
      default:""
    }
  },

  /* ---------- COMPANY UPLOADED DOCUMENTS ---------- */
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
    salarySlips:[
      {
        month:String,
        filePath:String
      }
    ]
  },

  /* ---------- META ---------- */
  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports=mongoose.model("Employee",EmployeeSchema,"employees");
