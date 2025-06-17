import React, { useState } from 'react'

export default function WaterForm({ onAdd }) {
  const [amount, setAmount] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount || !time) return
    onAdd({ amount: parseInt(amount), time })
    setAmount('')
    setTime('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount (ml)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
