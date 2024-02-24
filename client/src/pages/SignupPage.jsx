import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const SignupPage = () => {
  const [action, setAction] = useState("SignUp");
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    let user = {
      email: emailRef.current.value,
      display_name: userNameRef.current.value,
      password: passwordRef.current.value,
    };
    // user = JSON.stringify(user);
    console.log(user);
    axios
      .post("http://localhost:8080/api/v1/users/register", user)
      .then((res) => {
        console.log(res);
      });
    localStorage.setItem("USERNAME", user.display_name);
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
    </div>
  );
};

export default SignupPage;
