import Hero from "../components/Hero"
import Services from "../components/Services"
import WhyUs from "../components/WhyUs"
import Jobs from "../pages/JobsPage"
import Testimonials from "../components/Testimonials"
import Clients from "../components/Clients"

function Home(){

return(

<div className="w-full overflow-x-hidden">

<div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">

<Hero/>

<Services/>

<WhyUs/>

<Testimonials/>

<Jobs/>

<Clients/>

</div>

</div>

)

}

export default Home