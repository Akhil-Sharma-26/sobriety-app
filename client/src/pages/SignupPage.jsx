import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import './SignupPage.css'
import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
const SignupPage = () => {
  const [action, setAction] = useState("SignUp");
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const user = {
      email: emailRef.current.value,
      display_name: userNameRef.current.value,
      password: passwordRef.current.value,
    };
    // user = JSON.stringify(user);
    // console.log(user);
    if (user.email === "" || user.display_name === "" || user.password === "") {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post("http://localhost:8080/api/v1/users/register", user)
      .then((res) => {
        console.log(res);
        navigate("/login");
      });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Username" ref={userNameRef} />
        </div>
        <div className="input">
        <img src={email_icon} alt="" />
          <input type="email" placeholder="Email-Id" ref={emailRef} />
        </div>
        <div className="input">
        <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" ref={passwordRef} />
        </div>
      </div>
      <div className="submit-container">
        <button
          className="submit"
          onClick={() => {
            setAction("SignUp");
            handleSubmit();
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
