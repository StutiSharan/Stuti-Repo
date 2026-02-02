const API_URL=process.env.EXPO_PUBLIC_API_URL;

// SEND OTP
export const sendOtpApi=async(fullName:string,phone:string)=>{
  const res=await fetch(`${API_URL}/auth/send-otp`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({fullName,phone})
  });

  const data=await res.json();
  if(!res.ok)throw new Error(data.message||"OTP send failed");
  return data;
};

// VERIFY OTP
export const verifyOtpApi=async(phone:string,otp:string)=>{
  const res=await fetch(`${API_URL}/auth/verify-otp`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({phone,otp})
  });

  const data=await res.json();
  if(!res.ok)throw new Error(data.message||"OTP verification failed");
  return data;
};
