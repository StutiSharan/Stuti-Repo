import {
FaMailBulk,
FaHeadset,
FaUserTie,
FaTasks,
FaChartLine,
FaHandsHelping
} from "react-icons/fa"

import hero from "../../assets/carousel-1.jpg"
import manpower from "../../assets/manpower-2.jpg"

function ManPower(){

return(

<div className="bg-gray-100">

{/* HERO */}

<div
className="relative h-[180px] sm:h-[220px] md:h-[300px] bg-cover bg-center"
style={{backgroundImage:`url(${hero})`}}
>
<div className="absolute inset-0 bg-black/60 flex items-center">
<div className="max-w-6xl mx-auto px-4 sm:px-6 text-white w-full">
</div>
</div>
</div>


{/* ABOUT SECTION */}

<div className="max-w-6xl mx-auto py-8 md:py-16 px-4 sm:px-6 flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start">

{/* LEFT IMAGE */}

<div className="w-full md:w-[380px] flex-shrink-0">

<img
src={manpower}
alt="Man Power"
className="rounded-lg shadow-xl w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover"
/>

</div>


{/* RIGHT CONTENT */}

<div className="flex-1">

<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">
Man Power Services
</h2>

<p className="text-gray-600 text-sm sm:text-base leading-relaxed">

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


{/* SERVICE TYPES */}

<div className="py-8 md:py-16">

<div className="max-w-6xl mx-auto px-4 sm:px-6">

<h2 className="text-center text-2xl sm:text-3xl font-semibold mb-8 md:mb-12 text-gray-800">
Type of Man Power Services
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">

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

<div className="bg-white p-5 md:p-6 rounded shadow hover:shadow-lg transition duration-300 hover:-translate-y-1">

<div className="text-[#1d398d] text-2xl md:text-3xl mb-3 md:mb-4">
{icon}
</div>

<h3 className="font-semibold text-base md:text-lg mb-2">
{title}
</h3>

<p className="text-gray-600 text-sm leading-relaxed">
{text}
</p>

</div>

)

}