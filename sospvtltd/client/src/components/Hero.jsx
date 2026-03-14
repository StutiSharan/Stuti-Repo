import {Swiper,SwiperSlide} from "swiper/react"
import {Autoplay,Pagination} from "swiper/modules"
import {motion} from "framer-motion"
import {useRef} from "react"
import {FaChevronLeft,FaChevronRight} from "react-icons/fa"
import {Link} from "react-router-dom"

import "swiper/css"
import "swiper/css/pagination"

import slide1 from "../assets/manpower-4.jpg"
import slide2 from "../assets/manpower-2.jpg"
import slide3 from "../assets/manpower-5.jpg"
import slide4 from "../assets/manpower-1.jpg"
import slide5 from "../assets/manpower-3.jpg"

function Hero(){

const swiperRef=useRef(null)

const slides=[slide1,slide2,slide3,slide4,slide5]

return(

<section className="bg-gray-50 mt-10">

<div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center">

{/* TEXT */}

<div className="text-center md:text-left">

<motion.h1
initial={{y:50,opacity:0}}
animate={{y:0,opacity:1}}
transition={{duration:0.8}}
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
>
Manpower Services –
<br/>
<span className="text-[#1d398d]">
The Right Talent, The Right Time!
</span>
</motion.h1>

<motion.p
initial={{y:50,opacity:0}}
animate={{y:0,opacity:1}}
transition={{delay:0.2,duration:0.8}}
className="text-gray-600 text-sm sm:text-base mt-3"
>
Providing skilled and unskilled workforce solutions for various industries,
ensuring efficient recruitment and labor management.
</motion.p>

</div>


{/* SLIDER */}

<div className="relative">

<Swiper
modules={[Autoplay,Pagination]}
onSwiper={(swiper)=>swiperRef.current=swiper}
pagination={{clickable:true}}

autoplay={{
delay:2000,
disableOnInteraction:false
}}

speed={800}

loop
className="rounded-xl shadow-lg mt-10 overflow-hidden"
>

{slides.map((img,i)=>(
<SwiperSlide key={i}>
<div className="h-[200px] sm:h-[240px] md:h-[300px] w-full">
<img
src={img}
className="w-full h-full object-cover"
/>
</div>
</SwiperSlide>
))}

</Swiper>


{/* LEFT BUTTON */}

<button
onClick={()=>swiperRef.current?.slidePrev()}
className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md p-2 sm:p-3 rounded-full hover:bg-white"
>
<FaChevronLeft className="text-[11px] sm:text-[14px]"/>
</button>


{/* RIGHT BUTTON */}

<button
onClick={()=>swiperRef.current?.slideNext()}
className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md p-2 sm:p-3 rounded-full hover:bg-white"
>
<FaChevronRight className="text-[11px] sm:text-[14px]"/>
</button>

</div>


{/* BUTTONS */}

<div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start -mt-3 sm:-mt-4">

<Link to="/services/manpower" className="w-full sm:w-auto">
<button className="bg-[#1d398d] text-white px-6 py-3 rounded-lg w-full hover:bg-[#162d6b]">
Our Services
</button>
</Link>

<Link to="/contact" className="w-full sm:w-auto">
<button className="border border-[#1d398d] text-[#1d398d] px-6 py-3 rounded-lg w-full hover:bg-[#1d398d] hover:text-white">
Contact Us
</button>
</Link>

</div>

</div>

</section>

)

}

export default Hero