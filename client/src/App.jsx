import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import LLM from "./pages/Llm";
function App() {
  const [count, setCount] = useState(0);
  const user = localStorage.getItem("USERNAME");

  return (
    <>
      <p>
        Hey There!!
        <LLM />
      </p>
    </>
  );
}

export default App;
