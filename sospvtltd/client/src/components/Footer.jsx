import {
FaChevronRight,
FaMapMarkerAlt,
FaPhoneAlt,
FaEnvelope,
FaTwitter,
FaFacebookF,
FaYoutube,
FaLinkedinIn,
FaArrowUp
} from "react-icons/fa"

import {Link} from "react-router-dom"

function Footer(){

return(

<footer className="bg-[#2f3f48] text-gray-300 pt-8 md:pt-10 pb-4 text-sm relative">

<div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

{/* COMPANY */}

<div>

<h3 className="text-white text-lg font-semibold mb-4">
Company
</h3>

<ul className="space-y-2">

<li>
<Link to="/" className="flex items-center gap-2 hover:text-white">
<FaChevronRight className="text-xs"/> Home
</Link>
</li>

<li>
<Link to="/about" className="flex items-center gap-2 hover:text-white">
<FaChevronRight className="text-xs"/> About Us
</Link>
</li>

<li>
<Link to="/jobs" className="flex items-center gap-2 hover:text-white">
<FaChevronRight className="text-xs"/> Jobs
</Link>
</li>

<li>
<Link to="/contact" className="flex items-center gap-2 hover:text-white">
<FaChevronRight className="text-xs"/> Contact Us
</Link>
</li>

</ul>

</div>


{/* SERVICES */}

<div>

<h3 className="text-white text-lg font-semibold mb-4">
Our Services
</h3>

<ul className="space-y-2">

<li>
<Link to="/services/manpower" className="flex items-center gap-2 hover:text-white">
<FaChevronRight className="text-xs"/> Man Power Services
</Link>
</li>

<li>
<Link to="/services/inspection" className="flex items-center gap-2 hover:text-white">
<FaChevronRight className="text-xs"/> Third Party Inspection
</Link>
</li>

<li>
<Link to="/services/payroll" className="flex items-center gap-2 hover:text-white">
<FaChevronRight className="text-xs"/> Payroll Management Services
</Link>
</li>

</ul>

</div>


{/* CONTACT */}

<div>

<h3 className="text-white text-lg font-semibold mb-4">
Contact
</h3>

<ul className="space-y-3 text-sm">

<li className="flex gap-2">
<FaMapMarkerAlt className="mt-1 text-xs shrink-0"/>
<span>
Registered Office: H.No. - 5A, 3RD FLOOR, VIPIN GARDERN EXTN., GALI No.5, UTTAM NAGAR, West Delhi, Delhi (110059)
</span>
</li>

<li className="flex gap-2">
<FaMapMarkerAlt className="mt-1 text-xs shrink-0"/>
<span>
Corporate Office: NX-ONE, Sector-Techzone IV, Gr.Noida West, Gautam Budh Nagar, U.P. (201306)
</span>
</li>

<li className="flex items-center gap-2">
<FaPhoneAlt className="text-xs"/> +0120-6050516
</li>

<li className="flex items-center gap-2">
<FaEnvelope className="text-xs"/> info@sospvtltd.com
</li>

</ul>


{/* SOCIAL ICONS */}

<div className="flex gap-2 mt-4">

<a href="#" className="border border-gray-500 p-2 rounded hover:bg-blue-600 hover:border-blue-600 transition">
<FaTwitter size={12}/>
</a>

<a href="#" className="border border-gray-500 p-2 rounded hover:bg-blue-600 hover:border-blue-600 transition">
<FaFacebookF size={12}/>
</a>

<a href="#" className="border border-gray-500 p-2 rounded hover:bg-blue-600 hover:border-blue-600 transition">
<FaYoutube size={12}/>
</a>

<a href="#" className="border border-gray-500 p-2 rounded hover:bg-blue-600 hover:border-blue-600 transition">
<FaLinkedinIn size={12}/>
</a>

</div>

</div>

</div>


{/* Divider */}

<div className="border-t border-gray-600 mt-6 pt-3 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">

<p className="text-center sm:text-left">
© <span className="text-white">Salvation Outsourcing Solution Pvt. Ltd.</span>, All Right Reserved.
</p>

</div>


{/* SCROLL TOP */}

<button
onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
className="fixed bottom-5 right-5 bg-[#1d398d] text-white p-2.5 md:p-3 rounded shadow hover:bg-[#142a66]"
>
<FaArrowUp size={12}/>
</button>

</footer>

)

}

export default Footer