import {useParams} from "react-router-dom"
import {useState} from "react"

function ApplyJob(){

const {id} = useParams()

const [form,setForm] = useState({
name:"",
mobile:"",
email:"",
facebook:"",
resume:null
})

const handleChange=(e)=>{

if(e.target.name==="resume"){

setForm({...form,resume:e.target.files[0]})

}else{

setForm({...form,[e.target.name]:e.target.value})

}

}

const handleSubmit=(e)=>{
e.preventDefault()
console.log(form)
}

return(

<div className="min-h-screen bg-gray-100 py-16">

<div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow">

<h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
Apply For Job
</h1>

<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

{/* Name */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Full Name
</label>

<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Enter Your Name"
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded focus:ring-2 focus:ring-blue-900 outline-none"
/>

</div>

{/* Mobile */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Mobile Number
</label>

<input
name="mobile"
value={form.mobile}
onChange={handleChange}
placeholder="Enter Mobile Number"
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>

</div>

{/* Email */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Email Address
</label>

<input
name="email"
value={form.email}
onChange={handleChange}
placeholder="Enter Email"
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>

</div>

{/* Facebook */}

<div>
<label className="text-xs font-semibold text-gray-600 uppercase">
Facebook Profile
</label>

<input
name="facebook"
value={form.facebook}
onChange={handleChange}
placeholder="Facebook Link"
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>

</div>

{/* Resume Upload */}

<div className="col-span-2">
<label className="text-xs font-semibold text-gray-600 uppercase">
Upload Resume
</label>

<input
type="file"
name="resume"
onChange={handleChange}
className="w-full mt-1 border border-gray-300 px-3 py-2 text-sm rounded"
/>

</div>

{/* Submit Button */}

<button
type="submit"
className="col-span-2 bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-semibold transition"
>
Submit Application
</button>

</form>

</div>

</div>

)

}

export default ApplyJob
