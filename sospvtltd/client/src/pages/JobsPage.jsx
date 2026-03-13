import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import {motion} from "framer-motion"
import {FaMapMarkerAlt,FaClock,FaRupeeSign,FaCalendarAlt} from "react-icons/fa"

import {getJobs} from "../api/api"

function Jobs(){

const[jobs,setJobs]=useState([])
const[loading,setLoading]=useState(true)

const fetchJobs = async()=>{

try{

const data = await getJobs()

setJobs(data)

}catch(err){

console.error("Failed to fetch jobs")

}finally{

setLoading(false)

}

}

useEffect(()=>{
fetchJobs()
},[])

if(loading){

return(
<div className="min-h-screen flex items-center justify-center text-gray-500">
Loading jobs...
</div>
)

}

return(

<div className="bg-gray-50 min-h-screen">

{/* Header */}

<div className="bg-blue-900 text-white py-10 text-center">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-3xl font-bold"
>

Job Listings

</motion.h1>

<p className="mt-3 text-lg">
Find the best opportunities
</p>

</div>


{/* Job Cards */}

<div className="max-w-6xl mx-auto py-16 px-6 space-y-6">

{jobs.length===0 && (
<p className="text-center text-gray-500">
No jobs available
</p>
)}

{jobs.map((job,index)=>(

<motion.div
key={job._id}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.1}}
className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center hover:shadow-2xl transition"
>

<div>

<h2 className="text-xl font-bold mb-2">
{job.title}
</h2>

<div className="flex flex-wrap gap-6 text-gray-600 text-sm">

<span className="flex items-center gap-2">
<FaMapMarkerAlt className="text-[#1d398d]"/>
{job.location}
</span>

<span className="flex items-center gap-2">
<FaClock className="text-[#1d398d]"/>
{job.employmentType}
</span>

<span className="flex items-center gap-2">
<FaRupeeSign className="text-[#1d398d]"/>
{job.salary}
</span>

</div>

</div>

<div className="text-right">

<Link
to={`/job/${job._id}`}
className="bg-[#1d398d] text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
>

View Details

</Link>

<p className="text-sm text-gray-500 mt-3 flex items-center gap-2 justify-end">

<FaCalendarAlt/>

Last Date: {job.lastDate ? new Date(job.lastDate).toLocaleDateString() : "N/A"}

</p>

</div>

</motion.div>

))}

</div>

</div>

)

}

export default Jobs
