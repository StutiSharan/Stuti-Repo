import {Swiper,SwiperSlide} from "swiper/react"
import {Autoplay} from "swiper/modules"

import "swiper/css"

import accurate from "../assets/clients/accurate.jpg"
import emami from "../assets/clients/emami.jpg"
import fag from "../assets/clients/fag-india.jpg"
import future from "../assets/clients/future-group.jpg"
import hitech from "../assets/clients/hi-tech-gears.jpg"
import kyocera from "../assets/clients/kyocera.jpg"
import makino from "../assets/clients/makino.jpg"
import nestle from "../assets/clients/nestle.jpg"
import piaggio from "../assets/clients/piaggio.jpg"
import sakata from "../assets/clients/sakata-inx.jpg"
import schaeffler from "../assets/clients/schaeffler-group.jpg"
import siddhika from "../assets/clients/siddhika.jpg"
import sukam from "../assets/clients/su-kam.jpg"
import varroc from "../assets/clients/varroc.jpg"

const clients=[
accurate,emami,fag,future,hitech,
kyocera,makino,nestle,piaggio,
sakata,schaeffler,siddhika,sukam,varroc
]

function Clients(){

return(

<section className="py-8 md:py-6 bg-gray-100">

<div className="max-w-7xl mx-auto px-8 sm:px-6">

<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 md:mb-4">
Our Clients
</h2>

<Swiper
modules={[Autoplay]}
loop
autoplay={{
delay:2000,
disableOnInteraction:false
}}
spaceBetween={12}
breakpoints={{
320:{slidesPerView:2,spaceBetween:12},
640:{slidesPerView:3,spaceBetween:16},
768:{slidesPerView:4,spaceBetween:20},
1024:{slidesPerView:5,spaceBetween:24},
1280:{slidesPerView:6,spaceBetween:30}
}}
>

{clients.map((logo,index)=>(

<SwiperSlide key={index}>

<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 sm:p-4 md:p-6 flex items-center justify-center h-[70px] sm:h-[85px] md:h-[100px]">

<img
src={logo}
alt="client"
className="max-h-10 sm:max-h-12 md:max-h-14 object-contain transition"
/>

</div>

</SwiperSlide>

))}

</Swiper>

</div>

</section>

)

}

export default Clients