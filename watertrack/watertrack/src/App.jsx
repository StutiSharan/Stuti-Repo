import React, { useState, useRef } from 'react'
import WaterForm from './WaterForm'
import WaterList from './WaterList'
import { calculateTotal } from './helpers'

export default function App() {
  const [logs, setLogs] = useState([])
  const highlightRef = useRef(null)

  const addLog = (log) => {
    setLogs([...logs, log])
  }

  const removeLog = (index) => {
    setLogs(logs.filter((_, i) => i !== index))
  }

  const resetLogs = () => {
    setLogs([])
  }

  const total = calculateTotal(logs)

  // 👇 Impure use of useRef to directly manipulate DOM style
  if (highlightRef.current) {
    highlightRef.current.style.color = total > 2000 ? 'red' : 'black'
  }

  return (
    <div className="app">
      <h1>Water Tracker</h1>
      <WaterForm onAdd={addLog} />
      <h2 ref={highlightRef}>Total Intake: {total} ml</h2>
      <WaterList logs={logs} onRemove={removeLog} />
      <button onClick={resetLogs}>Reset</button>
    </div>
  )
}
