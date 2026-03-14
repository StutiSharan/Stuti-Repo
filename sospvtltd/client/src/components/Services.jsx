import {FaUserTie,FaClipboardCheck,FaChartLine} from "react-icons/fa"

function Services(){

return(

<section className="py-5 md:py-4 bg-gray-100">

<h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-10">
Our Services
</h2>

<div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">

{/* CARD 1 */}

<div className="bg-white p-5 sm:p-6 md:p-8 shadow rounded-lg">

<FaUserTie className="text-[#1d398d] text-3xl sm:text-4xl mb-3 sm:mb-4"/>

<h3 className="font-bold text-lg sm:text-xl mb-2">
Man Power Services
</h3>

<p className="text-gray-600 text-sm sm:text-base leading-relaxed">
Manpower Services provide skilled and unskilled workforce solutions for various industries, ensuring efficient staffing for projects, maintenance, and operations.
</p>

</div>


{/* CARD 2 */}

<div className="bg-white p-5 sm:p-6 md:p-8 shadow rounded-lg">

<FaClipboardCheck className="text-[#1d398d] text-3xl sm:text-4xl mb-3 sm:mb-4"/>

<h3 className="font-bold text-lg sm:text-xl mb-2">
Third Party Inspection
</h3>

<p className="text-gray-600 text-sm sm:text-base leading-relaxed">
Third-Party Inspection (TPI) ensures independent verification of products, equipment, and processes to meet quality, safety, and regulatory standards.
</p>

</div>


{/* CARD 3 */}

<div className="bg-white p-5 sm:p-6 md:p-8 shadow rounded-lg">

<FaChartLine className="text-[#1d398d] text-3xl sm:text-4xl mb-3 sm:mb-4"/>

<h3 className="font-bold text-lg sm:text-xl mb-2">
Payroll Management
</h3>

<p className="text-gray-600 text-sm sm:text-base leading-relaxed">
Payroll Management Service handles salary processing, tax deductions, compliance, and employee benefits to ensure accurate and timely payroll management.
</p>

</div>

</div>

</section>

)

}

export default Services