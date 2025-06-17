import React,{useEffect,useRef}from"react"
import{useMood}from"../context/MoodContext"

export default function MoodItem({mood}){
  const{deleteMood,lastAddedRef}=useMood()
  const itemRef=useRef()
  useEffect(()=>{
    if(mood.timestamp===lastAddedRef){
      itemRef.current.scrollIntoView({behavior:"smooth"})
      itemRef.current.classList.add("bg-yellow-100")
      setTimeout(()=>itemRef.current.classList.remove("bg-yellow-100"),2000)
    }
  },[lastAddedRef])

  return(
    <div ref={itemRef} className="p-3 bg-white rounded shadow flex justify-between items-center">
      <div>
        <div className="text-2xl">{mood.emoji}</div>
        <div className="text-sm text-gray-500">{new Date(mood.timestamp).toLocaleString()}</div>
        <div>{mood.description}</div>
      </div>
      <button onClick={()=>deleteMood(mood.id)} className="text-red-500 font-bold">X</button>
    </div>
  )
}
