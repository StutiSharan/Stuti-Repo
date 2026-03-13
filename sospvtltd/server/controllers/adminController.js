import Admin from "../models/Admin.js"
import Job from "../models/Job.js"

export const adminLogin = async(req,res)=>{

try{

const {email,password} = req.body

const admin = await Admin.findOne({email,password})

if(!admin){

return res.status(401).json({
success:false,
message:"Invalid credentials"
})

}

res.json({
success:true,
message:"Login successful"
})

}catch(err){

res.status(500).json({
success:false,
message:err.message
})

}

}


export const createJob = async(req,res)=>{

try{

const job = new Job(req.body)

await job.save()

res.json({
success:true,
message:"Job posted successfully"
})

}catch(err){

res.status(500).json({
success:false,
message:err.message
})

}

}
