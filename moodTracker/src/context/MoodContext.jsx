import React,{createContext,useContext,useEffect,useRef,useState} from"react"
export const MoodContext=createContext()
const dbUrl="https://appartmentfinder-1bd34-default-rtdb.asia-southeast1.firebasedatabase.app/moods.json"

export default function MoodProvider({children}){
  const[moods,setMoods]=useState([])
  const[lastAddedRef,setLastAddedRef]=useState(null)

  useEffect(()=>{
    fetchMoods()
  },[])

  const fetchMoods=async()=>{
    const res=await fetch(dbUrl)
    const data=await res.json()
    if(data){
      const loaded=Object.entries(data).map(([id,val])=>({...val,id}))
      loaded.sort((a,b)=>b.timestamp-a.timestamp)
      setMoods(loaded)
    }
  }

  const addMood=async(mood)=>{
    const res=await fetch(dbUrl,{
      method:"POST",
      body:JSON.stringify(mood)
    })
    if(res.ok)fetchMoods()
    setLastAddedRef(mood.timestamp)
  }

  const deleteMood=async(id)=>{
    await fetch(dbUrl.replace(".json","/"+id+".json"),{method:"DELETE"})
    fetchMoods()
  }

  const value={moods,addMood,deleteMood,lastAddedRef}
  return<MoodContext.Provider value={value}>{children}</MoodContext.Provider>
}
export const useMood=()=>useContext(MoodContext)