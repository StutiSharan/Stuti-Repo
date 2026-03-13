import Application from "../models/Application.js"

export const applyJob = async(req,res)=>{

try{

const {jobId,name,email,phone,facebook,message} = req.body

if(!jobId || !name || !email || !phone){

return res.status(400).json({
success:false,
message:"Required fields missing"
})

}

if(!req.file){

return res.status(400).json({
success:false,
message:"Resume required"
})

}

const resumeUrl = req.file.location

const application = new Application({

jobId,
name,
email,
phone,
facebook,
message,
resume:resumeUrl

})

await application.save()

res.status(201).json({

success:true,
message:"Application submitted successfully"

})

}catch(err){

res.status(500).json({

success:false,
message:err.message

})

}

}
