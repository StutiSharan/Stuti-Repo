import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import logo from "../assets/sos-logo.png"

function Navbar(){

const [hoverOpen,setHoverOpen]=useState(false)
const [clickOpen,setClickOpen]=useState(false)
const dropdownRef=useRef(null)

const isOpen = hoverOpen || clickOpen

// close when clicking outside
useEffect(()=>{
function handleClickOutside(e){
if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
setClickOpen(false)
}
}
document.addEventListener("mousedown",handleClickOutside)
return()=>document.removeEventListener("mousedown",handleClickOutside)
},[])

return(

<nav className="bg-white shadow sticky top-0 z-50">

<div className="max-w-7xl mx-auto flex justify-between items-center p-4">

{/* Logo */}

<div className="flex items-center gap-3">

<img src={logo} className="w-16"/>

<h1 className="font-semibold text-[#1d398d] whitespace-nowrap">
Salvation Outsourcing Solution Pvt Ltd
</h1>

</div>

<ul className="flex gap-8 text-gray-700 font-medium">

<li><Link to="/">HOME</Link></li>

<li><Link to="/about">ABOUT</Link></li>

{/* SERVICES */}

<li
ref={dropdownRef}
className="relative"
onMouseEnter={()=>setHoverOpen(true)}
onMouseLeave={()=>setHoverOpen(false)}
>

<span
className="cursor-pointer"
onClick={()=>setClickOpen(!clickOpen)}
>
SERVICES ▾
</span>

{isOpen && (

<div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg py-2">

<Link
to="/services/manpower"
className="block px-4 py-2 hover:bg-blue-50"
>
Man Power Services
</Link>

<Link
to="/services/inspection"
className="block px-4 py-2 hover:bg-blue-50"
>
Third Party Inspection
</Link>

<Link
to="/services/payroll"
className="block px-4 py-2 hover:bg-blue-50"
>
Payroll Management
</Link>

</div>

)}

</li>

<li><Link to="/jobs">JOBS</Link></li>

<li><Link to="/contact">CONTACT</Link></li>

</ul>

<Link
to="/jobs"
className="bg-[#1d398d] text-white px-5 py-2 rounded-lg hover:bg-[#1d398d]"
>
Apply Now →
</Link>

</div>

</nav>

)

}

export default Navbar