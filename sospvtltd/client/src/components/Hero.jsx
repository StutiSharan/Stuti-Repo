import {Swiper,SwiperSlide} from "swiper/react"
import {Autoplay,Pagination} from "swiper/modules"
import {motion} from "framer-motion"
import {useRef} from "react"
import {FaChevronLeft,FaChevronRight} from "react-icons/fa"
import {Link} from "react-router-dom"

import "swiper/css"
import "swiper/css/pagination"

import slide1 from "../assets/oneHero.png"
import slide2 from "../assets/twoHero.png"
import video from "../assets/Corporate_Video_For_Manpower_Services.mp4"

function Hero(){

const swiperRef=useRef(null)

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
autoplay={{delay:7000}}
loop
className="rounded-xl shadow-lg bg-white p-2 mt-10"
>

<SwiperSlide>
<div className="flex items-center justify-center h-[180px] sm:h-[240px] md:h-[320px]">
<video autoPlay muted loop playsInline className="max-h-full max-w-full object-contain">
<source src={video} type="video/mp4"/>
</video>
</div>
</SwiperSlide>

<SwiperSlide>
<div className="flex items-center justify-center h-[180px] sm:h-[240px] md:h-[320px]">
<img src={slide1} className="max-h-full object-contain"/>
</div>
</SwiperSlide>

<SwiperSlide>
<div className="flex items-center justify-center h-[180px] sm:h-[240px] md:h-[320px]">
<img src={slide2} className="max-h-full object-contain"/>
</div>
</SwiperSlide>

</Swiper>

<button
onClick={()=>swiperRef.current.slidePrev()}
className="absolute left-1 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
>
<FaChevronLeft size={12}/>
</button>

<button
onClick={()=>swiperRef.current.slideNext()}
className="absolute right-1 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
>
<FaChevronRight size={12}/>
</button>

</div>

{/* BUTTONS */}

<div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start -mt-3 sm:-mt-4">

<Link to="/services/manpower" className="w-full sm:w-auto">
<button className="bg-[#1d398d] text-white px-6 py-3 rounded-lg w-full">
Our Services
</button>
</Link>

<Link to="/contact" className="w-full sm:w-auto">
<button className="border border-[#1d398d] text-[#1d398d] px-6 py-3 rounded-lg w-full">
Contact Us
</button>
</Link>

</div>

</div>

</section>

)

}

export default Hero