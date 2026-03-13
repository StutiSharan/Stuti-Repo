import {FaCheck} from "react-icons/fa"

import hero from "../assets/carousel-1.jpg"
import about1 from "../assets/about-1.jpg"
import about2 from "../assets/about-2.jpg"
import about3 from "../assets/about-3.jpg"
// import md from "../assets/md.png"

function About(){

return(

<div className="bg-gray-100">

{/* HEADER */}

<div
className="relative h-[300px] bg-cover bg-center"
style={{backgroundImage:`url(${hero})`}}
>

<div className="absolute inset-0 bg-black/60 flex items-center">

<div className="max-w-7xl mx-auto px-6 text-white">

<h1 className="text-5xl font-bold mb-3">
About Us
</h1>

<p className="text-sm uppercase tracking-wide">

<span className="text-blue-400">Home</span> /
<span className="ml-2">About</span>

</p>

</div>

</div>

</div>


{/* ABOUT SECTION */}

<div className="max-w-7xl mx-auto py-20 px-6">

<div className="grid md:grid-cols-2 gap-14 items-center">

{/* TEXT */}

<div>

<h2 className="text-3xl font-bold mb-6">
About Us
</h2>

<p className="text-gray-600 mb-4 leading-relaxed">
At Salvation Outsourcing, we don’t just connect people with jobs; we craft possibilities and pave the way for success. As a dynamic staffing solutions provider, we specialize in matching exceptional talent with businesses that aspire to grow, thrive, and lead.
</p>

<p className="text-gray-600 mb-6 leading-relaxed">
Our journey began with a singular belief: that talent is limitless and opportunities are abundant. Today, we are proud to serve as the bridge that brings these two together.
</p>

<p className="flex gap-3 mb-3 text-gray-700">
<FaCheck className="text-[#1d398d] mt-1"/>
<span><b>Empowering Talent:</b> Helping individuals unlock their true potential.</span>
</p>

<p className="flex gap-3 mb-3 text-gray-700">
<FaCheck className="text-[#1d398d] mt-1"/>
<span><b>Building Businesses:</b> Delivering tailored staffing solutions.</span>
</p>

<p className="flex gap-3 text-gray-700">
<FaCheck className="text-[#1d398d] mt-1"/>
<span><b>Fostering Connections:</b> Building trust and strong relationships.</span>
</p>

</div>


{/* IMAGES */}

<div className="grid grid-cols-2 gap-4">

<img
src={about1}
className="rounded-lg shadow-lg w-full"
/>

<img
src={about2}
className="rounded-lg shadow-lg w-[85%] mt-12"
/>

</div>

</div>


{/* MANAGING DIRECTOR */}

<div className="grid md:grid-cols-2 gap-14 items-center mt-24">

{/* IMAGES */}

<div className="grid grid-cols-2 gap-4">

<img
src={about3}
className="rounded-lg shadow-lg"
/>

<img
src={about1}
className="rounded-lg shadow-lg w-[85%] mt-12"
/>

</div>


{/* TEXT */}

<div>

<h2 className="text-3xl font-bold mb-6">
Managing Director
</h2>

<p className="text-gray-600 mb-4 leading-relaxed">
Every day is a new chapter in the book of our journey. As we stand together striving for excellence, I want to remind you of the incredible potential each one of us holds.
</p>

<p className="text-gray-600 mb-4 leading-relaxed">
<b>To my dedicated team:</b> you are the heart and soul of our vision. Your hard work and creativity drive us forward.
</p>

<p className="text-gray-600 mb-4 leading-relaxed">
<b>To the vibrant youth:</b> you are the architects of tomorrow. Dare to dream big and believe in your ability to create, innovate, and lead.
</p>

<p className="text-gray-600 leading-relaxed">
Together we are not just building a company or career — we are creating a legacy.
</p>

</div>

</div>

</div>

</div>

)

}

export default About