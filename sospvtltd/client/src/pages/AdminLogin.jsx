import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {adminLogin} from "../api/api"
import {FaEye,FaEyeSlash} from "react-icons/fa"

function AdminLogin(){

const navigate = useNavigate()

const[form,setForm]=useState({
email:"",
password:""
})

const[loading,setLoading]=useState(false)
const[showPassword,setShowPassword]=useState(false)

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{

e.preventDefault()

if(loading) return

try{

setLoading(true)

const res=await adminLogin(form)

if(res.success){

localStorage.setItem("admin","true")

navigate("/admin/jobPost")

}else{

alert(res.message)

}

}catch(err){

alert("Login failed")

}finally{

setLoading(false)

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

<form
onSubmit={handleSubmit}
className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm"
>

<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
Admin Login
</h2>

{/* EMAIL */}

<input
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
required
className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
/>


{/* PASSWORD */}

<div className="relative mb-6">

<input
name="password"
type={showPassword ? "text" : "password"}
placeholder="Password"
value={form.password}
onChange={handleChange}
required
className="border p-3 w-full rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-800"
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
>
{showPassword ? <FaEyeSlash/> : <FaEye/>}
</button>

</div>


{/* LOGIN BUTTON */}

<button
type="submit"
disabled={loading}
className={`w-full py-3 rounded text-white font-semibold transition
${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"}
`}
>
{loading ? "Logging in..." : "Login"}
</button>

</form>

</div>

)

}

export default AdminLogin