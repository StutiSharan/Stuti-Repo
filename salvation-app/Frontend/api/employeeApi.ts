const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/* SEND OTP */
export const sendEmployeeOtpApi = async (data:any)=>{
  const res = await fetch(`${API_BASE_URL}/employees/send-otp`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(data)
  });
  const json = await res.json();
  if(!res.ok) throw new Error(json.message);
  return json;
};

/* VERIFY OTP */
export const verifyEmployeeOtpApi = async (data:any)=>{
  const res = await fetch(`${API_BASE_URL}/employees/verify-otp`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(data)
  });
  const json = await res.json();
  if(!res.ok) throw new Error(json.message);
  return json;
};

/* GET PROFILE */
export const getEmployeeProfile = async (employeeId:string)=>{
  const res = await fetch(`${API_BASE_URL}/employees/profile/${employeeId}`);
  const json = await res.json();
  if(!res.ok) throw new Error(json.message);
  return json;
};

/* UPDATE PROFILE */
export const updateEmployeeProfile = async (
  employeeId:string,
  payload:any
)=>{
  const res = await fetch(`${API_BASE_URL}/employees/profile/${employeeId}`,{
    method:"PUT",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(payload)
  });
  const json = await res.json();
  if(!res.ok) throw new Error(json.message);
  return json;
};
