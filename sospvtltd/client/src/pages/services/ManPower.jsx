import {
FaMailBulk,
FaHeadset,
FaUserTie,
FaTasks,
FaChartLine,
FaHandsHelping
} from "react-icons/fa"

import hero from "../../assets/carousel-1.jpg"
import about1 from "../../assets/about-1.jpg"
import manpower from "../../assets/manpaower.png"

function ManPower(){

return(

<div className="bg-gray-100">

{/* HERO */}

<div
className="relative h-[300px] bg-cover bg-center"
style={{backgroundImage:`url(${hero})`}}
>
<div className="absolute inset-0 bg-black/60 flex items-center">
<div className="max-w-6xl mx-auto px-6 text-white"></div>
</div>
</div>


{/* ABOUT SECTION */}

<div className="max-w-6xl mx-auto py-20 px-6 flex gap-12 items-start">

{/* LEFT IMAGE */}

<div className="w-[380px] flex-shrink-0">

<img
src={manpower}
alt="Man Power"
className="rounded-lg shadow-xl w-full h-[300px] object-cover"
/>

</div>


{/* RIGHT CONTENT */}

<div className="flex-1">

<div className="ml-10">

<h2 className="text-4xl font-bold mb-6 text-gray-800">
Man Power Services
</h2>

<p className="text-gray-600 leading-relaxed">

Manpower services refer to the outsourcing of human resources to businesses,
industries, and organizations that require skilled, semi-skilled, or
unskilled workforce for their operations.
<br/><br/>

These services are essential in sectors such as construction,
manufacturing, IT, healthcare, retail, hospitality, and more.
<br/><br/>

A reliable manpower service provider ensures the right talent is available
at the right time, optimizing productivity and efficiency.

</p>

</div>

</div>

</div>


{/* SERVICE TYPES */}

<div className="py-16">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-center text-3xl font-semibold mb-12 text-gray-800">
Type of Man Power Services
</h2>

<div className="grid md:grid-cols-3 gap-8">

<ServiceCard
icon={<FaMailBulk/>}
title="Temporary Staffing"
text="Short-term workforce solutions for seasonal, project-based, or urgent hiring needs."
/>

<ServiceCard
icon={<FaHeadset/>}
title="Permanent Staffing"
text="Recruitment of full-time employees based on specific skills and job roles."
/>

<ServiceCard
icon={<FaUserTie/>}
title="Contract Staffing"
text="Hiring professionals for a fixed period, often used in IT and specialized industries."
/>

<ServiceCard
icon={<FaTasks/>}
title="Payroll Management"
text="Handling employee payroll, tax compliance, and salary disbursements."
/>

<ServiceCard
icon={<FaChartLine/>}
title="Skilled & Unskilled Labor Supply"
text="Providing workforce for various industries including blue-collar and white-collar jobs."
/>

<ServiceCard
icon={<FaHandsHelping/>}
title="Executive Search & Recruitment"
text="Head-hunting for leadership roles and managerial positions."
/>

</div>

</div>

</div>

</div>

)

}

export default ManPower



function ServiceCard({icon,title,text}){

return(

<div className="bg-white p-6 rounded shadow hover:shadow-lg transition duration-300 hover:-translate-y-1">

<div className="text-[#1d398d] text-3xl mb-4">
{icon}
</div>

<h3 className="font-semibold text-lg mb-2">
{title}
</h3>

<p className="text-gray-600 text-sm leading-relaxed">
{text}
</p>

</div>

)

}