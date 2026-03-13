import {useEffect,useState} from "react"
import JobCard from "./JobCard"
import API from "../api/api"

function Jobs(){

const[jobs,setJobs]=useState([])

useEffect(()=>{

API.get("/jobs")
.then(res=>setJobs(res.data))

},[])

return(

<section className="py-10">

<h2 className="text-center text-4xl font-bold mb-2">

Job Listing

</h2>

<div className="max-w-6xl mx-auto flex flex-col gap-6">

{jobs.map(job=>(
<JobCard key={job._id} job={job}/>
))}

</div>

</section>

)

}

export default Jobs