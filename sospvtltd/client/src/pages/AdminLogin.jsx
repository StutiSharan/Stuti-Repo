import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {adminLogin} from "../api/api"

function AdminLogin(){

const navigate = useNavigate()

const [form,setForm] = useState({
email:"",
password:""
})

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{

e.preventDefault()

try{

const res = await adminLogin(form)

if(res.success){

localStorage.setItem("admin","true")

navigate("/admin/jobPost")

}else{

alert(res.message)

}

}catch(err){

alert("Login failed")

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">

<h2 className="text-2xl font-bold mb-6 text-center">
Admin Login
</h2>

<input
name="email"
placeholder="Email"
onChange={handleChange}
className="border p-3 w-full mb-4 rounded"
/>

<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
className="border p-3 w-full mb-6 rounded"
/>

<button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded">
Login
</button>

</form>

</div>

)

}

export default AdminLogin
