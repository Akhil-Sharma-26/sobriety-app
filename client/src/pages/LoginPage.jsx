import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const [action, setAction] = useState("Login");
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async () => {
    // const hashedPass = await bcrypt.hash(passwordRef.current.value, 10);
    // console.log(hashedPass);
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (user.email === "" || user.display_name === "" || user.password === "") {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        user
      );
      console.log(res);
      localStorage.setItem("USERNAME_ID", res.data.user_id);
    } catch (error) {
      console.error("SomeError Occured", error);
    }
  };

  return (
    <>
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
            <button onClick={()=>navigate('/signup')}> Click Here!
            </button>
            </span>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
