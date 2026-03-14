import {Link} from "react-router-dom"
import {FaMapMarkerAlt,FaClock} from "react-icons/fa"

function JobCard({job}){

return(

<div className="bg-white shadow p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row sm:justify-between gap-4">

<div>

<h3 className="text-lg sm:text-xl font-bold">
{job.title}
</h3>

<p className="flex items-center gap-2 text-gray-600 text-sm">

<FaMapMarkerAlt/>

{job.location}

</p>

<p className="flex items-center gap-2 text-gray-600 text-sm">

<FaClock/>

{job.type}

</p>

<p className="text-[#1d398d] font-semibold mt-1">

₹ {job.salary}

</p>

</div>

<Link
to={`/job/${job._id}`}
className="bg-[#1d398d] text-white px-4 py-2 rounded w-full sm:w-auto text-center h-fit"
>
View Detail
</Link>

</div>

)

}

export default JobCard