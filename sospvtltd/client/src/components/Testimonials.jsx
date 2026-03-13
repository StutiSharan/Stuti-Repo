import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { FaQuoteLeft } from "react-icons/fa"

import "swiper/css"
import "swiper/css/pagination"

import client1 from "../assets/testimonial-1.jpg"
import client2 from "../assets/testimonial-2.jpg"
import client3 from "../assets/testimonial-3.jpg"
import client4 from "../assets/testimonial-4.jpg"

function Testimonials(){

const testimonials=[
{
image:client1,
text:"Salvation Outsourcing Pvt Ltd has been instrumental in streamlining our operations. Their team is highly professional and always delivers on time!",
company:"ACCURATE ENGINEERING Co. PVT LTD"
},
{
image:client2,
text:"We've been working with Salvation Outsourcing for over a year, and their commitment to quality and efficiency is unmatched. Highly recommended!",
company:"VARROC ENGINEERING PVT LTD"
},
{
image:client3,
text:"Their outsourcing solutions have helped us cut costs while improving productivity. The team is knowledgeable and proactive.",
company:"SCHEFFLER INDIA LTD"
},
{
image:client4,
text:"From project initiation to execution, their team maintained seamless communication and delivered beyond expectations.",
company:"JAIN INDUSTRIAL PRODUCT"
}
]

return(

<section className="py-14 bg-gray-100">

<div className="max-w-7xl mx-auto px-10">

<h2 className="text-center text-4xl font-bold mb-10 text-gray-800">
Our Clients Say
</h2>

<Swiper
modules={[Autoplay,Pagination]}
loop={true}
autoplay={{
delay:3000,
disableOnInteraction:false
}}
pagination={{clickable:true}}
spaceBetween={30}
breakpoints={{
640:{slidesPerView:1},
768:{slidesPerView:2},
1024:{slidesPerView:3}
}}
>

{testimonials.map((item,index)=>(
<SwiperSlide key={index} className="h-full">

<div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col justify-between">

<div>

<FaQuoteLeft className="text-[#1d398d] text-3xl mb-6"/>

<p className="text-gray-600 leading-relaxed mb-8 min-h-[120px]">
{item.text}
</p>

</div>

<div className="flex items-center gap-4">

<img
src={item.image}
alt="client"
className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
/>

<div>

<h4 className="font-semibold text-gray-800">
{item.company}
</h4>

<p className="text-sm text-gray-500">
Client
</p>

</div>

</div>

</div>

</SwiperSlide>
))}

</Swiper>

</div>

</section>

)

}

export default Testimonials