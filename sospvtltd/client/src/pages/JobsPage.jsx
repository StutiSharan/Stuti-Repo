import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import {motion} from "framer-motion"
import {FaMapMarkerAlt,FaClock,FaRupeeSign,FaCalendarAlt} from "react-icons/fa"
import {getJobs} from "../api/api"

function Jobs(){

const[jobs,setJobs]=useState([])
const[loading,setLoading]=useState(true)
const[page,setPage]=useState(1)
const[totalPages,setTotalPages]=useState(1)

const fetchJobs = async()=>{

try{

setLoading(true)

const data = await getJobs()

setJobs(data || [])

}catch(err){

console.error("Failed to fetch jobs")

}finally{

setLoading(false)

}

}

useEffect(()=>{
fetchJobs(page)
},[page])

if(loading){

return(
<div className="py-20 flex items-center justify-center text-gray-500">
Loading jobs...
</div>
)

}

return(

<div className="bg-gray-50">

{/* Header */}

<div className="bg-blue-900 text-white py-6 md:py-10 text-center">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-2xl sm:text-3xl font-bold"
>
Job Listings
</motion.h1>

<p className="mt-1 text-sm sm:text-lg">
Find the best opportunities
</p>

</div>


{/* Job Cards */}

<div className="max-w-6xl mx-auto py-9 md:py-11 px-4 sm:px-6 space-y-4">

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
className="bg-white shadow-md rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3 hover:shadow-xl transition"
>

<div>

<h2 className="text-lg sm:text-xl font-bold mb-1">
{job.title}
</h2>

<div className="flex flex-wrap gap-3 text-gray-600 text-sm">

<span className="flex items-center gap-1">
<FaMapMarkerAlt className="text-[#1d398d]"/>
{job.location}
</span>

<span className="flex items-center gap-1">
<FaClock className="text-[#1d398d]"/>
{job.employmentType}
</span>

<span className="flex items-center gap-1">
<FaRupeeSign className="text-[#1d398d]"/>
{job.salary}
</span>

</div>

</div>

<div className="flex flex-col items-start md:items-end gap-1 w-full md:w-auto">

<Link
to={`/job/${job._id}`}
className="bg-[#1d398d] text-white px-5 py-2 rounded-lg w-full md:w-auto text-center"
>
View Details
</Link>

<p className="text-xs text-gray-500 flex items-center gap-2">

<FaCalendarAlt/>

Last Date: {job.lastDate ? new Date(job.lastDate).toLocaleDateString() : "N/A"}

</p>

</div>

</motion.div>

))}

</div>


{/* Pagination */}

<div className="flex justify-center items-center gap-3 pb-12">

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
>
Prev
</button>

<span className="font-semibold">
Page {page} of {totalPages}
</span>

<button
disabled={page===totalPages}
onClick={()=>setPage(page+1)}
className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
>
Next
</button>

</div>

</div>

)

}

export default Jobs