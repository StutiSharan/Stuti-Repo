const API_BASE_URL=process.env.EXPO_PUBLIC_API_URL;

export const createCandidateApi = async(data:{
  fullName:string;
  fatherName:string;
  address:string;
  mobile:string;
  resume:any;
  aadhaar:any;
})=>{
  try{
    const formData = new FormData();

    formData.append("fullName",data.fullName);
    formData.append("fatherName",data.fatherName); // ✅
    formData.append("address",data.address);       // ✅
    formData.append("mobile",data.mobile);

    if(data.resume){
      formData.append("resume",{
        uri:data.resume.uri,
        name:data.resume.name,
        type:"application/pdf"
      } as any);
    }

    if(data.aadhaar){
      formData.append("aadhaar",{
        uri:data.aadhaar.uri,
        name:"aadhaar.jpg",
        type:"image/jpeg"
      } as any);
    }

    const res = await fetch(
      `${API_BASE_URL}/candidates/create-candidate`,
      {
        method:"POST",
        body:formData
      }
    );

    const result = await res.json();
    if(!res.ok) throw new Error(result.message);

    return result;

  }catch(err:any){
    console.error("❌ createCandidateApi:",err.message);
    throw err;
  }
};
export const getCandidateByMobileApi = async(mobile:string)=>{
  try{
    const res = await fetch(
      `${API_BASE_URL}/candidates/by-mobile/${mobile}`,
      {
        method:"GET",
        headers:{ "Content-Type":"application/json" }
      }
    );

    const result = await res.json();

    if(!res.ok){
      // 🔕 404 means "not registered yet" → this is OK
      throw new Error(result.message || "Not found");
    }

    return result;

  }catch(err:any){
    console.log("ℹ️ getCandidateByMobileApi:",err.message);
    throw err;
  }
};