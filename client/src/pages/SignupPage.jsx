import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import bcryptjs from "bcryptjs";
const SignupPage = () => {
  const [action, setAction] = useState("SignUp");
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // const hashedPass = await bcryptjs.hash(passwordRef.current.value, 10);
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
          <input type="text" placeholder="Username" ref={userNameRef} />
        </div>
        <div className="input">
          <input type="email" placeholder="Email-Id" ref={emailRef} />
        </div>
        <div className="input">
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
      <div className="wao">
            Already Have an Account??
          <span >
            <button onClick={()=>navigate('/login')}> Click Here!
            </button>
            </span>
        </div>
    </div>
  );
};

export default SignupPage;
