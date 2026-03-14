// const API = import.meta.env.VITE_API_URL
const API = "/api"

export const sendContact = async(data)=>{

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

}


// GET JOBS

export const getJobs = async()=>{

const res = await fetch(`${API}/jobs`)
return res.json()

}


// GET JOB BY ID

export const getJobById = async(id)=>{

const res = await fetch(`${API}/jobs/${id}`)
return res.json()

}


// CREATE JOB

export const createJob = async(data)=>{

const res = await fetch(`${API}/jobs/create`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

return res.json()

}


// UPDATE JOB

export const updateJob = async(id,data)=>{

const res = await fetch(`${API}/jobs/update/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

return res.json()

}


// DELETE JOB

export const deleteJob = async(id)=>{

const res = await fetch(`${API}/jobs/delete/${id}`,{
method:"DELETE"
})

return res.json()

}


// APPLY JOB

export const applyJob = async(formData)=>{

const res = await fetch(`${API}/jobs/apply`,{
method:"POST",
body:formData
})

return res.json()

}


// ADMIN LOGIN

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