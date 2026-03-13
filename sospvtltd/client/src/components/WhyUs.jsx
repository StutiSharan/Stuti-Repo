import about1 from "../assets/about-1.jpg"
import about2 from "../assets/about-2.jpg"
import { FaCheck } from "react-icons/fa"

function WhyUs(){

return(

<section className="py-15 bg-white">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

{/* LEFT IMAGES */}

<div className="grid grid-cols-2 gap-4">

<img
src={about1}
className="rounded-lg shadow-lg w-full"
/>

<img
src={about2}
className="rounded-lg shadow-lg mt-16 w-full"
/>

</div>


{/* RIGHT CONTENT */}

<div>

<h2 className="text-3xl font-bold mb-6">
Why Us
</h2>

<p className="text-gray-600 mb-6">

At Salvation Outsourcing, we don't just connect people with jobs; we craft possibilities and pave the way for success. As a dynamic staffing solutions provider, we specialize in matching exceptional talent with businesses that aspire to grow, thrive, and lead.

</p>

<div className="space-y-4 text-gray-700">

<p className="flex gap-3">
<FaCheck className="text-[#1d398d] mt-1"/>
<span><b>Empowering Talent:</b> Helping individuals unlock their potential.</span>
</p>

<p className="flex gap-3">
<FaCheck className="text-[#1d398d] mt-1"/>
<span><b>Building Businesses:</b> Delivering strong staffing solutions.</span>
</p>

<p className="flex gap-3">
<FaCheck className="text-[#1d398d] mt-1"/>
<span><b>Fostering Connections:</b> Building trust and partnerships.</span>
</p>

</div>

</div>

</div>

</section>

)

}

export default WhyUs