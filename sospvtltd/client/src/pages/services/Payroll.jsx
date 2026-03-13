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
import payroll from "../../assets/payroll.png"

function Payroll(){

return(

<div className="bg-gray-100">

{/* HERO */}

<div
className="relative h-[300px] bg-cover bg-center"
style={{backgroundImage:`url(${hero})`}}
>

<div className="absolute inset-0 bg-black/60 flex items-center">

<div className="max-w-6xl mx-auto px-6 text-white">

<h1 className="text-5xl font-bold mb-3">
Payroll Management Services
</h1>

<p className="text-sm uppercase tracking-wide">

<span className="text-blue-400">Home</span>
<span className="mx-2">/</span>
<span className="text-blue-400">Services</span>
<span className="mx-2">/</span>
Payroll Management Services

</p>

</div>

</div>

</div>


{/* ABOUT SECTION */}

<div className="max-w-6xl mx-auto py-20 px-6 flex gap-12 items-start">

{/* LEFT IMAGE */}

<div className="w-[380px] flex-shrink-0">

<img
src={payroll}
alt="Payroll"
className="rounded-lg shadow-xl w-full h-[300px] object-cover"
/>

</div>


{/* RIGHT CONTENT */}

<div className="flex-1">

<h2 className="text-4xl font-bold mb-6 text-gray-800">
Payroll Management Service
</h2>

<p className="text-gray-600 leading-relaxed">

Payroll management is the process of managing and processing employee
compensation, including wages, bonuses, deductions, taxes, and benefits.
<br/><br/>

It involves calculating salaries, ensuring compliance with local laws,
and distributing payments accurately and on time.
<br/><br/>

Proper payroll management is crucial for employee satisfaction,
legal compliance, and efficient business operations.

</p>

</div>

</div>


{/* SERVICE TYPES */}

<div className="py-16">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-center text-3xl font-semibold mb-12 text-gray-800">
Type of Payroll Management Service
</h2>

<div className="grid md:grid-cols-3 gap-8">

<ServiceCard
icon={<FaMailBulk/>}
title="Salary Calculation"
text="Accurately calculating employee salaries based on work hours, overtime, leaves, and performance bonuses."
/>

<ServiceCard
icon={<FaHeadset/>}
title="Tax Deductions & Compliance"
text="Ensuring timely and correct tax deductions including income tax, provident fund (PF), and statutory deductions."
/>

<ServiceCard
icon={<FaUserTie/>}
title="Benefits Administration"
text="Managing employee benefits such as insurance, retirement funds, leave entitlements, and bonuses."
/>

<ServiceCard
icon={<FaTasks/>}
title="Pay Slip Generation"
text="Generating detailed pay slips reflecting employee earnings, deductions, and benefits."
/>

<ServiceCard
icon={<FaChartLine/>}
title="Direct Deposit & Payment Disbursement"
text="Ensuring timely and secure payment transfer to employees’ bank accounts."
/>

<ServiceCard
icon={<FaHandsHelping/>}
title="Employee Records Management"
text="Maintaining accurate employee compensation, attendance, and payroll data."
/>

</div>

</div>

</div>

</div>

)

}

export default Payroll



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