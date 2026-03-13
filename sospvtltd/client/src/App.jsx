import {BrowserRouter,Routes,Route} from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/ServicesPage"
import Jobs from "./pages/JobsPage"
import JobDetails from "./pages/JobDetails"
import ApplyJob from "./pages/ApplyJob"
import Contact from "./pages/Contact"
import ManPower from "./pages/services/ManPower"
import Inspection from "./pages/services/Inspection"
import Payroll from "./pages/services/Payroll"
import AdminLogin from "./pages/AdminLogin"
import AdminJobPost from "./pages/AdminJobPost"
import { Toaster } from "react-hot-toast";

function App(){

return(

<BrowserRouter>
<Toaster position="top-right" />

<ScrollToTop/>
<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/services" element={<Services/>}/>
<Route path="/jobs" element={<Jobs/>}/>
<Route path="/job/:id" element={<JobDetails/>}/>
<Route path="/apply/:id" element={<ApplyJob/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/services/manpower" element={<ManPower/>}/>
<Route path="/services/inspection" element={<Inspection/>}/>
<Route path="/services/payroll" element={<Payroll/>}/>
<Route path="/admin" element={<AdminLogin/>}/>
<Route path="/admin/jobPost" element={<AdminJobPost/>}/>
</Routes>

<Footer/>

</BrowserRouter>

)

}

export default App