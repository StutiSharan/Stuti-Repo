import React from"react"
import MoodProvider from"./context/MoodContext"
import MoodForm from"./components/MoodForm"
import MoodList from"./components/MoodList"

export default function App(){
  return(
    <MoodProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">MoodMate</h1>
        <MoodForm/>
        <MoodList/>
      </div>
    </MoodProvider>
  )
}