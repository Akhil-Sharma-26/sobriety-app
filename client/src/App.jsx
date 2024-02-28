import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Profilepage from "./pages/Profilepage";

import LLM from "./pages/Llm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { TodoProvider } from "./context/UserContext";
function App() {
  const [user, setUser] = useState("");
  const [uid, setUid] = useState(0);
  // const user = localStorage.getItem("USERNAME");
  const addTodo = (user, uid) => {
    setUser(localStorage.getItem("USERNAME"));
    setUid(localStorage.getItem("USERNAME_ID"));
  }
  return (
    <>
      <TodoProvider value={{user,uid,addTodo}}>
      <Header />
      <Outlet />
      <Footer />
      </TodoProvider>
    </>
  );
}

export default App;
