import Job from "../models/Job.js"
import Application from "../models/Application.js"


// GET ALL JOBS WITH PAGINATION

export const getJobs = async(req,res)=>{

try{

const page = parseInt(req.query.page) || 1
const limit = 5

const skip = (page - 1) * limit

const total = await Job.countDocuments()

const jobs = await Job.find()
.sort({createdAt:-1})
.skip(skip)
.limit(limit)

res.json({
success:true,
jobs,
total,
page,
totalPages:Math.ceil(total/limit)
})

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}



// GET JOB BY ID

export const getJobById = async(req,res)=>{

try{

const job = await Job.findById(req.params.id)

res.json(job)

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}


export const createJob = async(req,res)=>{

try{

const job = new Job(req.body)

await job.save()

res.json(job)

}catch(error){

res.status(500).json({error:error.message})

}

}

export const applyJob = async(req,res)=>{

try{

const application = new Application(req.body)

await application.save()

res.json({
success:true,
message:"Application submitted successfully"
})

}catch(error){

res.status(500).json({error:error.message})

}

}

export const updateJob = async(req,res)=>{

try{

const job = await Job.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json({
success:true,
message:"Job updated successfully",
job
})

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}

export const deleteJob = async(req,res)=>{

try{

await Job.findByIdAndDelete(req.params.id)

res.json({
success:true,
message:"Job deleted successfully"
})

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}