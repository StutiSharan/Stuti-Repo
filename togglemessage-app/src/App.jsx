import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToggleMessage from './ToggleMessage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToggleMessage/>
    </>
  )
}

export default App
