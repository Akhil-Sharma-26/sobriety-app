import React, { useEffect } from "react";

const Landing = () => {
  const user = useEffect(()=>{
    const user = localStorage.getItem("USERNAME");
    if(!user){
      window.location.href = "/login";
    } 
  },[user])
  return <div>Landing</div>;
};

export default Landing;
