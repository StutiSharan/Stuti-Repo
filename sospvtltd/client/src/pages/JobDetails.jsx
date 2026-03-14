import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"
import {motion} from "framer-motion"
import {FaMapMarkerAlt,FaClock,FaRupeeSign,FaCalendarAlt} from "react-icons/fa"
import {getJobById,applyJob} from "../api/api"
import toast from "react-hot-toast"

function JobDetails(){

const {id}=useParams()

const[job,setJob]=useState(null)
const[loading,setLoading]=useState(false)

const[form,setForm]=useState({
name:"",
phone:"",
email:"",
facebook:"",
education:"",
industry:"",
message:"",
resume:null
})

const fetchJob=async()=>{
try{
const data=await getJobById(id)
setJob(data)
}catch(err){
console.error("Failed to fetch job")
}
}

useEffect(()=>{
fetchJob()
},[id])

const handleChange=(e)=>{

if(e.target.name==="resume"){
setForm({...form,resume:e.target.files[0]})
return
}

if(e.target.name==="phone"){
const value=e.target.value.replace(/\D/g,"")
setForm({...form,phone:value})
return
}

setForm({...form,[e.target.name]:e.target.value})
}

const validateForm=()=>{

if(!form.name.trim()){
toast.error("Name is required")
return false
}

if(!form.phone){
toast.error("Phone number required")
return false
}

if(form.phone.length<10){
toast.error("Enter valid phone number")
return false
}

if(!form.education){
toast.error("Please select education")
return false
}

if(!form.industry){
toast.error("Please select industry")
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

return true
}

const handleSubmit=async(e)=>{

e.preventDefault()
if(loading) return
if(!validateForm()) return

try{

setLoading(true)

const formData=new FormData()

formData.append("jobId",id)
formData.append("name",form.name)
formData.append("email",form.email)
formData.append("phone",form.phone)
formData.append("facebook",form.facebook)
formData.append("education",form.education)
formData.append("industry",form.industry)
formData.append("message",form.message)
formData.append("resume",form.resume)

const res=await applyJob(formData)

if(res.success){

toast.success("Application submitted successfully")

setForm({
name:"",
phone:"",
email:"",
facebook:"",
education:"",
industry:"",
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
<div className="py-20 text-center text-gray-500">
Loading job details...
</div>
)
}

return(

<div className="bg-gray-50">

{/* HEADER */}

<div className="bg-blue-900 text-white py-10 md:py-16 text-center">

<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
Job Detail
</h1>

</div>


{/* CONTENT */}

<div className="max-w-6xl mx-auto py-8 md:py-16 px-4 sm:px-6 grid lg:grid-cols-3 gap-6 md:gap-10">

{/* LEFT CONTENT */}

<motion.div
initial={{opacity:0,x:-50}}
animate={{opacity:1,x:0}}
className="lg:col-span-2 bg-white p-5 sm:p-8 rounded-xl shadow"
>

<h2 className="text-xl sm:text-2xl font-bold mb-4">
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


{/* FORM */}

<div className="mt-10">

<h3 className="text-xl font-bold mb-6 text-gray-800">
Apply For This Job
</h3>

<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

{/* NAME */}

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

{/* PHONE */}

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


{/* EDUCATION */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Education
</label>

<select
name="education"
value={form.education}
onChange={handleChange}
required
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
>
<option value="">Select Education</option>
<option>Below High School</option>
<option>High School</option>
<option>Intermediate</option>
<option>Diploma</option>
<option>ITI</option>
<option>Graduate</option>
<option>Post Graduate</option>
<option>PhD</option>
</select>
</div>


{/* INDUSTRY */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Industry
</label>

<select
name="industry"
value={form.industry}
onChange={handleChange}
required
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
>
<option value="">Select Industry</option>
<option>Fresher</option>
<option>Manufacturing</option>
<option>Automobile</option>
<option>Construction</option>
<option>IT & Software</option>
<option>Healthcare</option>
<option>Finance & Banking</option>
<option>Education</option>
<option>Retail & E-commerce</option>
<option>Telecommunication</option>
<option>Pharmaceutical</option>
<option>Real Estate</option>
<option>Oil & Gas</option>
<option>Textile & Apparel</option>
<option>Food & Beverage</option>
<option>Logistics & Transportation</option>
<option>Hospitality & Tourism</option>
<option>Agriculture</option>
<option>Media & Entertainment</option>
</select>
</div>


{/* EMAIL */}

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


{/* FACEBOOK */}

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


{/* RESUME */}

<div className="sm:col-span-2">
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


{/* MESSAGE */}

<div className="sm:col-span-2">
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
className={`sm:col-span-2 py-2.5 rounded-lg text-sm font-semibold transition text-white 
${loading 
? "bg-gray-400 cursor-not-allowed" 
: "bg-blue-900 hover:bg-blue-800"}
`}
>
{loading ? "Submitting... Please Wait !" : "Apply Now"}
</button>

</form>

</div>

</motion.div>


{/* JOB SUMMARY */}

<motion.div
initial={{opacity:0,x:50}}
animate={{opacity:1,x:0}}
className="bg-white p-5 sm:p-8 rounded-xl shadow h-fit"
>

<h3 className="text-xl font-bold mb-6">
Job Summary
</h3>

<ul className="space-y-3 text-gray-600 text-sm sm:text-base">

<li className="flex items-center gap-2">
<FaCalendarAlt/>
Published On: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
</li>

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