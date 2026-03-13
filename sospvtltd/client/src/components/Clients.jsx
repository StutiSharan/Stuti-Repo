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

<section className="py-10 bg-gray-100">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-3xl font-bold text-center mb-10">
Our Clients
</h2>

<Swiper
modules={[Autoplay]}
loop={true}
autoplay={{
delay:2000,
disableOnInteraction:false
}}
spaceBetween={30}
breakpoints={{
320:{slidesPerView:2},
640:{slidesPerView:3},
768:{slidesPerView:4},
1024:{slidesPerView:5},
1280:{slidesPerView:6}
}}
>

{clients.map((logo,index)=>(

<SwiperSlide key={index}>

<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 flex items-center justify-center h-[100px]">

<img
src={logo}
alt="client"
className="max-h-14 object-contain transition"/>

</div>

</SwiperSlide>

))}

</Swiper>

</div>

</section>

)

}

export default Clients