import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"
import {motion} from "framer-motion"
import {FaMapMarkerAlt,FaClock,FaRupeeSign} from "react-icons/fa"
import {getJobById,applyJob} from "../api/api"
import toast from "react-hot-toast"

function JobDetails(){

const {id} = useParams()

const [job,setJob] = useState(null)

const [loading,setLoading] = useState(false)

const [form,setForm] = useState({
name:"",
phone:"",
email:"",
facebook:"",
message:"",
resume:null
})

const fetchJob = async()=>{
try{
const data = await getJobById(id)
setJob(data)
}catch(err){
console.error("Failed to fetch job")
}
}

useEffect(()=>{
fetchJob()
},[id])

// handle input change
const handleChange=(e)=>{

if(e.target.name==="resume"){
setForm({...form,resume:e.target.files[0]})
return
}

// prevent letters in phone
if(e.target.name==="phone"){
const value = e.target.value.replace(/\D/g,"")
setForm({...form,phone:value})
return
}

setForm({...form,[e.target.name]:e.target.value})
}


// validation function
const validateForm = ()=>{

if(!form.name.trim()){
toast.error("Name is required")
return false
}

if(!form.phone){
toast.error("Phone number required")
return false
}

if(form.phone.length < 10){
toast.error("Enter valid phone number")
return false
}

if(!form.email){
toast.error("Email required")
return false
}

const emailRegex=/^\S+@\S+\.\S+$/

if(!emailRegex.test(form.email)){
toast.error("Invalid email format")
return false
}

if(!form.resume){
toast.error("Please upload resume")
return false
}

const allowed=[
"application/pdf",
"application/msword",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
"image/jpeg",
"image/png",
"image/jpg"
]

if(!allowed.includes(form.resume.type)){
toast.error("Upload PDF, DOC or Image file")
return false
}

return true
}


// submit
const handleSubmit=async(e)=>{
console.log("Submitting form")

e.preventDefault()

if(!validateForm()) return

try{

setLoading(true)

const formData = new FormData()

formData.append("jobId",id)
formData.append("name",form.name)
formData.append("email",form.email)
formData.append("phone",form.phone)
formData.append("facebook",form.facebook)
formData.append("message",form.message)
formData.append("resume",form.resume)

const res = await applyJob(formData)

if(res.success){

toast.success("Application submitted successfully")

setForm({
name:"",
phone:"",
email:"",
facebook:"",
message:"",
resume:null
})

}else{
toast.error(res.message)
}

}catch(err){

toast.error("Application failed")

}finally{
setLoading(false)
}

}

if(!job){

return(
<div className="text-center py-20 text-gray-500">
Loading job details...
</div>
)

}

return(

<div className="bg-gray-50 min-h-screen">

<div className="bg-blue-900 text-white py-20 text-center">
<h1 className="text-5xl font-bold">
Job Detail
</h1>
</div>

<div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10">

<motion.div
initial={{opacity:0,x:-50}}
animate={{opacity:1,x:0}}
className="md:col-span-2 bg-white p-8 rounded-xl shadow"
>

<h2 className="text-2xl font-bold mb-6">
{job.title}
</h2>

<h3 className="font-semibold text-lg mb-2">
Special Skills
</h3>

<p className="text-gray-600 mb-6">
{job.specialSkills}
</p>

<h3 className="font-semibold text-lg mb-2">
Other Information
</h3>

<p className="text-gray-600">
{job.otherInfo}
</p>

<div className="mt-12">

<h3 className="text-xl font-bold mb-6 text-gray-800">
Apply For This Job
</h3>

<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Full Name
</label>

<input
name="name"
value={form.name}
required
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Mobile Number
</label>

<input
name="phone"
value={form.phone}
onChange={handleChange}
required
maxLength="10"
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Email
</label>

<input
name="email"
value={form.email}
required
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Facebook (Optional)
</label>

<input
name="facebook"
value={form.facebook}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

<div className="col-span-2">
<label className="text-xs font-semibold text-gray-600 uppercase">
Upload Resume
</label>

<input
type="file"
name="resume"
required
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

<div className="col-span-2">
<label className="text-xs font-semibold text-gray-600 uppercase">
Additional Information (Optional)
</label>

<textarea
name="message"
value={form.message}
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>
</div>

<button
disabled={loading}
type="submit"
className="col-span-2 bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-semibold transition"
>
{loading ? "Submitting..." : "Apply Now"}
</button>

</form>

</div>

</motion.div>

<motion.div
initial={{opacity:0,x:50}}
animate={{opacity:1,x:0}}
className="bg-white p-8 rounded-xl shadow h-fit"
>

<h3 className="text-xl font-bold mb-6">
Job Summary
</h3>

<ul className="space-y-3 text-gray-600">

<li>Industry: {job.industry}</li>

<li className="flex items-center gap-2">
<FaClock/>
{job.employmentType}
</li>

<li>Vacancy: {job.vacancy}</li>

<li>Experience: {job.experience}</li>

<li className="flex items-center gap-2">
<FaRupeeSign/>
{job.salary}
</li>

<li className="flex items-center gap-2">
<FaMapMarkerAlt/>
{job.location}
</li>

<li>
Last Date: {new Date(job.lastDate).toLocaleDateString()}
</li>

</ul>

</motion.div>

</div>

</div>

)

}

export default JobDetails
