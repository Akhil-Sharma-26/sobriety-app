// import React,{useState,useEffect} from 'react'
// const Profilepage = () => {
//         const [streak, setStreak] = useState(0);
//         const [maxStreak, setMaxStreak] = useState(0);
//         const [lastUpdated, setLastUpdated] = useState(null);

//         useEffect(() => {
//           const storedMaxStreak = localStorage.getItem('maxStreak');
//           if (storedMaxStreak) {
//             setMaxStreak(parseInt(storedMaxStreak));
//           }
//         }, []);

//         const updateStreak = () => {
//           const today = new Date().toDateString();
//           if (today !== lastUpdated) {
//             setStreak(streak + 1);
//             setLastUpdated(today);
//             if (streak + 1 > maxStreak) {
//               setMaxStreak(streak + 1);
//               localStorage.setItem('maxStreak', streak + 1);
//             }
//           } else {
//             alert('You can only update your streak once per day!');
//           }
//         };

//         return (
//           <div>
//             <h2>Streak Counter</h2>
//             <p>Current Streak: {streak}</p>
//             <p>Max Streak: {maxStreak}</p>
//             <button onClick={updateStreak}>Update Streak</button>
//           </div>
//         );
//     }

// export default Profilepage

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Profilepage = () => {
  const [user, setUser] = useState({});

  const user1 = {
    display_name: "John Doe",
    addiction: "asdfg@wertyu.com",
  };

  const fetchUserDetails = async (req, res) => {
    console.log("fetchUserDetails");
    axios
      .post("http://localhost:8080/api/v1/users/user-details", { user_id: 1})
      .then((res) => {
        console.log(res.data);
        user1.display_name = res.data.details.display_name;
        user1.addiction = res.data.details.addiction;
        setUser(user1);
      });
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <div>
        <h2>Name: {user.display_name}</h2>
        <button>EDIT</button>
      </div>
      <div>
        <h2>Addiction: {user.addiction}</h2>
        <button>EDIT</button>
      </div>
      <button onClick={fetchUserDetails}>BUTTON</button>
    </div>
  );
};

export default Profilepage;
