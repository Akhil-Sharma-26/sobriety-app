import React, { useEffect } from "react";

const Landing = () => {
  React.useEffect(()=>{
    const user = localStorage.getItem("USERNAME");
    if(!user){
      window.location.href = "/login";
    } 
  },[])
  return <div>Landing</div>;
};

export default Landing;
