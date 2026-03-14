import {useState,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom"
import {createJob,getJobs,updateJob,deleteJob} from "../api/api"
import {toast} from "react-toastify"

function AdminJobPost(){

const navigate = useNavigate()

const [loading,setLoading] = useState(false)
const [jobs,setJobs] = useState([])
const [editId,setEditId] = useState(null)

const [deleteId,setDeleteId] = useState(null)
const [showDeleteModal,setShowDeleteModal] = useState(false)

useEffect(()=>{

const admin = localStorage.getItem("admin")

if(!admin){
navigate("/admin")
}

fetchJobs()

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

const {name,value}=e.target

if(name==="vacancy"){
if(!/^\d*$/.test(value)){
toast.error("Vacancy must be a number")
return
}
}

setJob({
...job,
[name]:value
})

}

const fetchJobs = async()=>{

try{

const data = await getJobs()

setJobs(data.jobs || [])

}catch(err){

console.log(err)

}

}

const validateForm=()=>{

if(!job.title.trim()){
toast.error("Job title is required")
return false
}

if(!job.industry.trim()){
toast.error("Industry is required")
return false
}

if(!job.employmentType.trim()){
toast.error("Job nature is required")
return false
}

if(!job.vacancy){
toast.error("Vacancy is required")
return false
}

if(isNaN(job.vacancy)){
toast.error("Vacancy must be a number")
return false
}

if(Number(job.vacancy)<=0){
toast.error("Vacancy must be greater than 0")
return false
}

if(!job.experience.trim()){
toast.error("Experience is required")
return false
}

if(!job.salary.trim()){
toast.error("Salary range is required")
return false
}

if(!job.location.trim()){
toast.error("Location is required")
return false
}

if(!job.lastDate){
toast.error("Last date is required")
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

if(editId){

await updateJob(editId,job)
toast.success("Job updated successfully")

}else{

await createJob(job)
toast.success("Job posted successfully")

}

setJob(initialState)
setEditId(null)

fetchJobs()

}catch(err){

toast.error("Operation failed")

}finally{

setLoading(false)

}

}

const handleEdit=(item)=>{

setJob({
...item,
lastDate:item.lastDate?.split("T")[0]
})

setEditId(item._id)

window.scrollTo({
top:0,
behavior:"smooth"
})

}

const handleDelete=(id)=>{

setDeleteId(id)
setShowDeleteModal(true)

}

const confirmDelete=async()=>{

try{

const res = await deleteJob(deleteId)

toast.success(res.message || "Job deleted")

fetchJobs()

}catch(err){

toast.error("Delete failed")

}

setShowDeleteModal(false)
setDeleteId(null)

}

return(

<div className="min-h-screen bg-gray-100 py-10 px-4">

<div className="max-w-6xl mx-auto">

{/* FORM */}

<div className="bg-white p-6 sm:p-8 rounded-xl shadow mb-10">

<h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">

{editId ? "Update Job" : "Post Job"}

</h1>

<form
onSubmit={handleSubmit}
className="grid grid-cols-1 sm:grid-cols-2 gap-5"
>

<div>
<label className="text-sm font-semibold">Job Title</label>
<input
name="title"
placeholder="Eg: Helper"
value={job.title}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div>
<label className="text-sm font-semibold">Industry</label>
<input
name="industry"
placeholder="Eg: Manufacturing"
value={job.industry}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div>
<label className="text-sm font-semibold">Job Nature</label>
<input
name="employmentType"
placeholder="Eg: Full time"
value={job.employmentType}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div>
<label className="text-sm font-semibold">Vacancy</label>
<input
type="number"
name="vacancy"
placeholder="Eg: 10"
value={job.vacancy}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div>
<label className="text-sm font-semibold">Experience</label>
<input
name="experience"
placeholder="Eg: 0-2 Years"
value={job.experience}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div>
<label className="text-sm font-semibold">Salary Range</label>
<input
name="salary"
placeholder="Eg: 15000-20000"
value={job.salary}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div>
<label className="text-sm font-semibold">Location</label>
<input
name="location"
placeholder="Eg: Noida"
value={job.location}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div>
<label className="text-sm font-semibold">Last Date</label>
<input
type="date"
name="lastDate"
value={job.lastDate}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div className="sm:col-span-2">
<label className="text-sm font-semibold">Special Skills</label>
<textarea
name="specialSkills"
placeholder="Special Skills (optional)"
value={job.specialSkills}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<div className="sm:col-span-2">
<label className="text-sm font-semibold">Other Information</label>
<textarea
name="otherInfo"
placeholder="Other info (optional)"
value={job.otherInfo}
onChange={handleChange}
className="border p-3 rounded w-full"
/>
</div>

<button
type="submit"
disabled={loading}
className={`sm:col-span-2 py-3 rounded text-white font-semibold
${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"}
`}
>

{loading
? "Saving..."
: editId
? "Update Job"
: "Post Job"}

</button>

</form>

</div>

{/* JOB LIST */}

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-bold mb-6">
Posted Jobs
</h2>

<div className="overflow-x-auto">

<table className="w-full border">

<thead className="bg-gray-200">

<tr>

<th className="p-3 text-left">Title</th>
<th className="p-3 text-left">Location</th>
<th className="p-3 text-left">Salary</th>
<th className="p-3 text-left">Published On</th>
<th className="p-3 text-left">Actions</th>

</tr>

</thead>

<tbody>

{jobs.map(item=>(

<tr key={item._id} className="border-t">

<td className="p-3">
{item.title}
</td>

<td className="p-3">
{item.location}
</td>

<td className="p-3">
{item.salary}
</td>

<td className="p-3">
{item.createdAt
? new Date(item.createdAt).toLocaleDateString()
: "N/A"}
</td>

<td className="p-3 flex gap-2 flex-wrap">

<Link
to={`/job/${item._id}`}
className="bg-blue-900 text-white px-3 py-1 rounded"
>
Details
</Link>

<button
onClick={()=>handleEdit(item)}
className="bg-yellow-500 text-white px-3 py-1 rounded"
>
Edit
</button>

<button
onClick={()=>handleDelete(item._id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

{/* DELETE MODAL */}

{showDeleteModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">

<h3 className="text-lg font-semibold mb-4">
Delete Job
</h3>

<p className="text-gray-600 mb-6">
Are you sure you want to delete this job? This action cannot be undone.
</p>

<div className="flex justify-end gap-3">

<button
onClick={()=>setShowDeleteModal(false)}
className="px-4 py-2 border rounded hover:bg-gray-100"
>
Cancel
</button>

<button
onClick={confirmDelete}
className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
Delete
</button>

</div>

</div>

</div>

)}

</div>

)

}

export default AdminJobPost