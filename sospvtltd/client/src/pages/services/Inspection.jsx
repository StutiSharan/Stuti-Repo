import {
FaMailBulk,
FaHeadset,
FaUserTie,
FaTasks,
FaChartLine,
FaHandsHelping
} from "react-icons/fa"

import hero from "../../assets/carousel-2.jpg"
import thirdParty from "../../assets/thiredParty.png"

function Inspection(){

return(

<div className="bg-gray-100">

{/* HERO */}

<div
className="relative h-[180px] sm:h-[220px] md:h-[300px] bg-cover bg-center"
style={{backgroundImage:`url(${hero})`}}
>

<div className="absolute inset-0 bg-black/60 flex items-center">

<div className="max-w-6xl mx-auto px-4 sm:px-6 text-white w-full">

<h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
Third Party Inspection
</h1>

</div>

</div>

</div>


{/* ABOUT SECTION */}

<div className="max-w-6xl mx-auto py-8 md:py-16 px-4 sm:px-6 flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start">

{/* LEFT IMAGE */}

<div className="w-full md:w-[380px] flex-shrink-0">

<img
src={thirdParty}
alt="Inspection"
className="rounded-lg shadow-xl w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover"
/>

</div>


{/* RIGHT CONTENT */}

<div className="flex-1">

<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">
Third Party Inspection
</h2>

<p className="text-gray-600 text-sm sm:text-base leading-relaxed">

Third-party inspection services refer to the independent evaluation of goods,
products, or services by an external organization, typically an unbiased
third party.

<br/><br/>

These services are vital to ensure compliance with industry standards,
quality control, and safety regulations.

<br/><br/>

Whether it’s for manufacturing, construction, or product shipments,
third-party inspection offers an unbiased assessment to ensure that
products meet specified requirements.

</p>

</div>

</div>


{/* SERVICE TYPES */}

<div className="py-8 md:py-16">

<div className="max-w-6xl mx-auto px-4 sm:px-6">

<h2 className="text-center text-2xl sm:text-3xl font-semibold mb-8 md:mb-12 text-gray-800">
Type of Third Party Inspection
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">

<ServiceCard
icon={<FaMailBulk/>}
title="Quality Control Inspections"
text="Verifying that the products meet the quality standards and specifications set by the client or industry."
/>

<ServiceCard
icon={<FaHeadset/>}
title="Pre-Shipment Inspection"
text="Inspection of goods before they are shipped to ensure they meet contractual obligations and quality standards."
/>

<ServiceCard
icon={<FaUserTie/>}
title="Factory Audits"
text="Assessing the manufacturing facility for compliance with production standards, capacity, and capabilities."
/>

<ServiceCard
icon={<FaTasks/>}
title="Product Certification"
text="Ensuring products meet regulatory certifications and safety standards."
/>

<ServiceCard
icon={<FaChartLine/>}
title="Material Inspection"
text="Assessing raw materials, components, or items used in production processes."
/>

<ServiceCard
icon={<FaHandsHelping/>}
title="Construction & Site Inspections"
text="Conducting regular inspections on construction sites to ensure adherence to building codes and safety regulations."
/>

</div>

</div>

</div>

</div>

)

}

export default Inspection



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