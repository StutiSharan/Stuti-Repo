import {Link} from "react-router-dom"
import {FaMapMarkerAlt,FaClock} from "react-icons/fa"

function JobCard({job}){

return(

<div className="bg-white shadow p-6 rounded flex justify-between">

<div>

<h3 className="text-xl font-bold">
{job.title}
</h3>

<p className="flex items-center gap-2 text-gray-600">

<FaMapMarkerAlt/>

{job.location}

</p>

<p className="flex items-center gap-2 text-gray-600">

<FaClock/>

{job.type}

</p>

<p className="text-[#1d398d] font-semibold">

₹ {job.salary}

</p>

</div>

<Link
to={`/job/${job._id}`}
className="bg-[#1d398d] text-white px-4 py-2 h-fit rounded"
>

View Detail

</Link>

</div>

)

}

export default JobCard