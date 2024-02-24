import React, { useEffect } from "react";

const Landing = () => {
  let user
    React.useEffect(()=>{
    user = localStorage.getItem("USERNAME");
    if(!user){
      window.location.href = "/login";
    } 
  },[]);
  return (
    <div>
      <div className="header">
        <h1>{user}</h1>
        <h4>Hi, {user} how are you</h4>
      </div>
      <div className="streak_box">
        <h2>Streak</h2>
        <h3>0</h3>
      </div>
      <div className="content_box">
        <div className="content_title">Daily Content</div>
        <div>Content card 1</div>
        <div>Content card 2</div>
      </div>
    </div>
  );
};

export default Landing;
