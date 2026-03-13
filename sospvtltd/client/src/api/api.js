const API = import.meta.env.VITE_API_URL

export const sendContact = async(data)=>{

try{

const res = await fetch(`${API}/contact`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

const result = await res.json()

if(!res.ok){
throw new Error(result.message || "Failed")
}

return result

}catch(err){

throw err

}

}


export const getJobs = async()=>{

const res = await fetch(`${API}/jobs`)
return res.json()

}
export const getJobById = async(id)=>{

const res = await fetch(`${API}/jobs/${id}`)

return res.json()

}


export const adminLogin = async(data)=>{

const res = await fetch(`${API}/admin/login`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

return res.json()

}


export const createJob = async(data)=>{

const res = await fetch(`${API}/admin/job`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

return res.json()

}
export const applyJob = async(formData)=>{

const res = await fetch(`${API}/application/apply`,{
method:"POST",
body:formData
})

return res.json()

}
