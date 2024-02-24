import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LLM from './pages/Llm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>
        Hey There!!
        <LLM />
      </p>
    </>
  )
}

export default App
