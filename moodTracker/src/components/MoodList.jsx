import React from"react"
import{useMood}from"../context/MoodContext"
import MoodItem from"./MoodItem"

export default function MoodList(){
  const{moods}=useMood()
  return(
    <div className="flex flex-col gap-2">
      {moods.length===0?<p>No moods yet</p>:
        moods.map(mood=><MoodItem key={mood.id} mood={mood}/>)
      }
    </div>
  )
}
