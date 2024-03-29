import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
const LoginPage = () => {
  const navigate = useNavigate()
  const [action, setAction] = useState("Login");
  const emailRef = useRef();
  const passwordRef = useRef();
  const {addTodo} = useTodo()
  const [user,setuser] = useState("")
  const handleSubmit = async () => {
    
    // const hashedPass = await bcrypt.hash(passwordRef.current.value, 10);
    // console.log(hashedPass);
    toast.loading('Loading...')
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (user.email === "" || user.password === "") {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        user
      );
      toast.dismiss()
      toast.success('Login Successfull!!')
      // add Timeout here!
      console.log(res);
      localStorage.setItem("USERNAME_ID", res.data.user_id);
      localStorage.setItem("USERNAME", res.data.display_name);
      addTodo(res.data.display_name,res.data.user_id)
      navigate('/')
    } catch (error) {
      console.error("SomeError Occured", error);
    }
  };

  return (
    <>
      <ToastContainer/>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="input">
          <input type="email" placeholder="Email-Id" ref={emailRef} />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" ref={passwordRef} />
        </div>
        <div className="submit-container">
          <button
            className="submit"
            onClick={() => {
              setAction("Login");
              handleSubmit();
            }}
          >
            Login
          </button>
        </div>
        <div className="forget-password">
          Forget Password
          <span> Click Here!</span>
        </div>
        <div className="wao">
            Don't Have an Account??
          <span >
            <button onClick={()=>navigate('/blogs')}> Click Here!
            </button>
            </span>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
