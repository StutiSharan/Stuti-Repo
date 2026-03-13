import Job from "../models/Job.js"
import Application from "../models/Application.js"


// GET ALL JOBS

export const getJobs = async(req,res)=>{

try{

const jobs = await Job.find().sort({createdAt:-1})

res.json(jobs)

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