import about1 from "../assets/about-1.jpg"
import about2 from "../assets/about-2.jpg"
import {FaCheck} from "react-icons/fa"

function WhyUs(){

return(

<section className="py-8 md:py-14 bg-white">

<div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">

{/* LEFT IMAGES */}

<div className="grid grid-cols-2 gap-3 sm:gap-4">

<img
src={about1}
className="rounded-lg shadow-md w-full object-cover"
/>

<img
src={about2}
className="rounded-lg shadow-md w-full object-cover mt-6 sm:mt-10 md:mt-16"
/>

</div>


{/* RIGHT CONTENT */}

<div>

<h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6">
Why Us
</h2>

<p className="text-gray-600 mb-4 md:mb-6 text-sm sm:text-base leading-relaxed">

At Salvation Outsourcing, we don't just connect people with jobs; we craft possibilities and pave the way for success. As a dynamic staffing solutions provider, we specialize in matching exceptional talent with businesses that aspire to grow, thrive, and lead.

</p>

<div className="space-y-3 md:space-y-4 text-gray-700 text-sm sm:text-base">

<p className="flex gap-3 items-start">
<FaCheck className="text-[#1d398d] mt-1 shrink-0"/>
<span><b>Empowering Talent:</b> Helping individuals unlock their potential.</span>
</p>

<p className="flex gap-3 items-start">
<FaCheck className="text-[#1d398d] mt-1 shrink-0"/>
<span><b>Building Businesses:</b> Delivering strong staffing solutions.</span>
</p>

<p className="flex gap-3 items-start">
<FaCheck className="text-[#1d398d] mt-1 shrink-0"/>
<span><b>Fostering Connections:</b> Building trust and partnerships.</span>
</p>

</div>

</div>

</div>

</section>

)

}

export default WhyUs