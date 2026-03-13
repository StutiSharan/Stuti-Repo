import {useState,useEffect} from "react"
import {createJob} from "../api/api"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

function AdminJobPost(){

const navigate = useNavigate()

useEffect(()=>{

const admin = localStorage.getItem("admin")

if(!admin){
navigate("/admin")
}

},[])

const initialState={
title:"",
specialSkills:"",
otherInfo:"",
industry:"",
employmentType:"",
vacancy:"",
experience:"",
salary:"",
location:"",
lastDate:""
}

const [job,setJob]=useState(initialState)

const handleChange=(e)=>{
setJob({...job,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{

e.preventDefault()

try{

const res = await createJob(job)

if(res.success){

toast.success(res.message || "Job posted successfully")

setJob(initialState)

}else{

toast.error(res.message)

}

}catch(err){

toast.error("Failed to post job")

}

}

return(

<div className="min-h-screen bg-gray-100 py-16">

<div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow">

<h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
Post Job
</h1>

<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

{/* Job Title */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Job Title
</label>

<input
name="title"
value={job.title}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded focus:ring-2 focus:ring-blue-600 outline-none"
/>
</div>

{/* Industry */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Industry
</label>

<input
name="industry"
value={job.industry}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Job Nature */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Job Nature
</label>

<input
name="employmentType"
value={job.employmentType}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Vacancy */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Vacancy
</label>

<input
name="vacancy"
value={job.vacancy}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Experience */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Experience
</label>

<input
name="experience"
value={job.experience}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Salary */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Salary Range
</label>

<input
name="salary"
value={job.salary}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Location */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Location
</label>

<input
name="location"
value={job.location}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Last Date */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Last Date
</label>

<input
type="date"
name="lastDate"
value={job.lastDate}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Special Skills */}

<div className="col-span-2">
<label className="text-xs font-semibold text-gray-600 uppercase">
Special Skills
</label>

<textarea
name="specialSkills"
value={job.specialSkills}
onChange={handleChange}
rows="3"
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Other Info */}

<div className="col-span-2">
<label className="text-xs font-semibold text-gray-600 uppercase">
Other Information
</label>

<textarea
name="otherInfo"
value={job.otherInfo}
onChange={handleChange}
rows="3"
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

{/* Submit */}

<button
type="submit"
className="col-span-2 bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-semibold transition"
>
Post Job
</button>

</form>

</div>

</div>

)

}

export default AdminJobPost
