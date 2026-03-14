import { useState } from "react"
import { FaMapMarkerAlt, FaEnvelopeOpen, FaPhoneAlt } from "react-icons/fa"
import { sendContact } from "../api/api"
import { toast } from "react-toastify"

function Contact(){

const [form,setForm] = useState({
name:"",
email:"",
subject:"",
message:""
})
const [loading,setLoading] = useState(false)
const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}

const handleSubmit = async(e)=>{

e.preventDefault()

if(loading) return

try{

setLoading(true)

const res = await sendContact(form)

toast.success(res.message || "Message sent successfully")

setForm({
name:"",
email:"",
subject:"",
message:""
})

}catch(err){

toast.error(err.message || "Failed to send message")

}finally{

setLoading(false)

}

}

return(

<div className="bg-gray-50">

{/* HERO */}

<div className="bg-[#1d398d] py-12">

<div className="max-w-7xl mx-auto px-6 text-center text-white">

<h1 className="text-3xl font-semibold mb-1">
Contact Us
</h1>

<p className="text-blue-200 text-sm">
We would love to hear from you
</p>

</div>

</div>


<div className="max-w-7xl mx-auto px-6 py-10">

<h2 className="text-2xl font-semibold text-center mb-8">
Contact For Any Query
</h2>


<div className="grid md:grid-cols-2 gap-8">

{/* MAP */}

<div className="rounded-lg overflow-hidden shadow-md">

<iframe
src="https://www.google.com/maps?q=NX-ONE%20Techzone%20IV%20Greater%20Noida%20West&output=embed"
className="w-full h-[420px]"
loading="lazy"
/>

</div>


{/* FORM */}

<div className="bg-white rounded-lg shadow-md p-8">

<h3 className="text-xl font-semibold mb-2">
Send Us A Message
</h3>

<p className="text-gray-500 text-sm mb-6">
Fill the form and our team will contact you shortly.
</p>


<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
name="name"
value={form.name}
onChange={handleChange}
placeholder="Your Name"
required
className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
type="email"
name="email"
value={form.email}
onChange={handleChange}
placeholder="Your Email"
required
className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
type="text"
name="subject"
value={form.subject}
onChange={handleChange}
placeholder="Subject"
required
className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<textarea
rows="4"
name="message"
value={form.message}
onChange={handleChange}
placeholder="Write your message..."
required
className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<button
type="submit"
disabled={loading}
className={`w-full py-3 rounded text-white transition
${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1d398d] hover:bg-blue-700"}
`}
>
{loading ? "Sending..." : "Send Message"}
</button>

</form>

</div>

</div>

</div>

</div>

)

}

export default Contact