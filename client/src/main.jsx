import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Landing from "./pages/Landing.jsx";

let user = null;
user = localStorage.getItem("USERNAME");
console.log(user);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={user ? <Landing /> : <SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="SignUp" element={<SignupPage />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
