import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  const [count, setCount] = useState(0);
  const user = localStorage.getItem("USERNAME");

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
