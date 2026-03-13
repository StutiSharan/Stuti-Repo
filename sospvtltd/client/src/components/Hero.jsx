import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { motion } from "framer-motion"
import { useRef } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Link } from "react-router-dom"

import "swiper/css"
import "swiper/css/pagination"

import slide1 from "../assets/oneHero.png"
import slide2 from "../assets/twoHero.png"
import video from "../assets/Corporate_Video_For_Manpower_Services.mp4"

function Hero(){

const swiperRef = useRef(null)

return(

<section className="bg-gray-50 py-10">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

{/* LEFT CONTENT */}

<div>

<motion.h1
initial={{y:50,opacity:0}}
animate={{y:0,opacity:1}}
transition={{duration:0.8}}
className="text-5xl font-bold leading-tight mb-6 text-gray-800"
>
Manpower Services – <br/>
<span className="text-[#1d398d]">
The Right Talent, The Right Time!
</span>
</motion.h1>

<motion.p
initial={{y:50,opacity:0}}
animate={{y:0,opacity:1}}
transition={{delay:0.2,duration:0.8}}
className="text-gray-600 text-lg mb-8 max-w-lg"
>
Providing skilled and unskilled workforce solutions for various industries,
ensuring efficient recruitment and labor management.
</motion.p>

<motion.div
initial={{y:50,opacity:0}}
animate={{y:0,opacity:1}}
transition={{delay:0.4,duration:0.8}}
className="flex gap-4"
>

<Link to="/services/manpower">
<button className="bg-[#1d398d] text-white px-6 py-3 rounded-lg hover:bg-[#1d398d] transition">
Our Services
</button>
</Link>

<Link to="/contact">
<button className="border border-[#1d398d] text-[#1d398d] px-6 py-3 rounded-lg hover:bg-blue-100 transition">
Contact Us
</button>
</Link>

</motion.div>

</div>


{/* RIGHT CAROUSEL */}

<div className="relative w-full">

<Swiper
modules={[Autoplay,Pagination]}
onSwiper={(swiper)=>swiperRef.current=swiper}
pagination={{clickable:true}}
autoplay={{
delay:7000,
disableOnInteraction:false
}}
loop
className="rounded-xl shadow-xl bg-white p-4"
>

{/* VIDEO FIRST */}

<SwiperSlide>

<div className="flex items-center justify-center h-[420px]">

<video
autoPlay
muted
loop
playsInline
className="max-h-full max-w-full object-contain"
>
<source src={video} type="video/mp4"/>
</video>

</div>

</SwiperSlide>


{/* IMAGE SECOND */}

<SwiperSlide>

<div className="flex items-center justify-center h-[420px]">

<img
src={slide1}
alt="Slide"
className="max-h-full max-w-full object-contain"
/>

</div>

</SwiperSlide>


{/* IMAGE THIRD */}

<SwiperSlide>

<div className="flex items-center justify-center h-[420px]">

<img
src={slide2}
alt="Slide"
className="max-h-full max-w-full object-contain"
/>

</div>

</SwiperSlide>

</Swiper>


{/* LEFT ARROW */}

<button
onClick={()=>swiperRef.current.slidePrev()}
className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-[#1d398d] hover:text-white transition z-10"
>
<FaChevronLeft/>
</button>


{/* RIGHT ARROW */}

<button
onClick={()=>swiperRef.current.slideNext()}
className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-[#1d398d] hover:text-white transition z-10"
>
<FaChevronRight/>
</button>

</div>

</div>

</section>

)

}

export default Hero