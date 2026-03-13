import {FaUserTie,FaClipboardCheck,FaChartLine} from "react-icons/fa"

function Services(){

return(

<section className="py-10 bg-gray-100">

<h2 className="text-center text-4xl font-bold mb-10">
Our Services
</h2>

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

<div className="bg-white p-8 shadow rounded">

<FaUserTie className="text-[#1d398d] text-4xl mb-4"/>

<h3 className="font-bold text-xl mb-2">
Man Power Services
</h3>

<p>
Manpower Services provide skilled and unskilled workforce solutions for various industries, ensuring efficient staffing for projects, maintenance, and operations.
</p>

</div>

<div className="bg-white p-8 shadow rounded">

<FaClipboardCheck className="text-[#1d398d] text-4xl mb-4"/>

<h3 className="font-bold text-xl mb-2">
Third Party Inspection
</h3>

<p>
Third-Party Inspection (TPI) ensures Independent verification of products, equipment, and processes to meet quality, safety, and regulatory standards.</p>

</div>

<div className="bg-white p-8 shadow rounded">

<FaChartLine className="text-[#1d398d] text-4xl mb-4"/>

<h3 className="font-bold text-xl mb-2">
Payroll Management
</h3>

<p>
Payroll Management Service handles salary processing, tax deductions, compliance, and employee benefits to ensure accurate and timely payroll management.</p>

</div>

</div>

</section>

)

}

export default Services