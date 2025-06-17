import React,{useEffect,useRef,useState} from"react"
import{useMood}from"../context/MoodContext"

export default function MoodForm(){
  const[emoji,setEmoji]=useState(localStorage.getItem("lastMood")||"😐")
  const[desc,setDesc]=useState(localStorage.getItem("lastDesc")||"")
  const{addMood}=useMood()
  const descRef=useRef()

  useEffect(()=>{descRef.current.focus()},[])
  useEffect(()=>{localStorage.setItem("lastMood",emoji)},[emoji])
  useEffect(()=>{localStorage.setItem("lastDesc",desc)},[desc])

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!desc)return
    const newMood={emoji,description:desc,timestamp:Date.now()}
    addMood(newMood)
    setDesc("")
  }

  return(
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <select value={emoji} onChange={e=>setEmoji(e.target.value)} className="p-2 rounded">
        <option>😄</option><option>😢</option><option>😐</option><option>😠</option><option>🤩</option>
      </select>
      <input ref={descRef} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe your mood" className="p-2 rounded"/>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Mood</button>
    </form>
  )
}