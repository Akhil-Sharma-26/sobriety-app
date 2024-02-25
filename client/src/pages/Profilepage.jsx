import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import './Profilepage.css'

const Profilepage = () => {
  const [user, setUser] = useState({});

  const user1 = {
    display_name: "John Doe",
    addiction: "asdfg@wertyu.com",
    longestStreak: 0,
    currentStreak: 0,
    streak: [],
  };

  const fetchUserDetails = async (req, res) => {
    console.log("fetchUserDetails");
    axios
      .post("http://localhost:8080/api/v1/users/user-details", { user_id: 1})
      .then((res) => {
        user1.display_name = res.data.details.display_name;
        user1.addiction = res.data.details.addiction;
        setUser(user1);
      });

      //(new Date()).getFullYear()
      axios.post("http://localhost:8080/api/v1/users/streak", { user_id: 1 , streak_year: 2024 })
        .then((res) => {
          user1.streak = res.data.streak;
        });
      axios.post("http://localhost:8080/api/v1/users/streak-info", { user_id: 1, streak_year: 2024 })
        .then((res) => {
          user1.longestStreak = res.data.longestStreak;
          user1.currentStreak = res.data.currentStreak;
        });
      
      setUser(user1);
      displayStreak(user, 2024);

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
      <div>
        <h2>Current Streak: {user.currentStreak}</h2>
        <h3>Longest Streak: {user.longestStreak}</h3>
          <div id="streak-wrapper">        
            <h3>This year:</h3>
            <div id="streak-boxes"></div>
          </div>
      </div>
    </div>
  );
};

export default Profilepage;


function displayStreak(user, year) {
  let days = [31, 28 + ((year % 4 == 0) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let start = 0;
  for (let i = 0; i < 12; i++) {
      let monthStreak = user.streak.slice(start, start + days[i]);
      let table = displayMonthStreak(monthStreak, monthNames[i]);
      start += days[i];
      document.getElementById('streak-boxes').appendChild(table);
  }
  
  // let table = document.createElement('table');
  // let row = document.createElement('tr');
  // let rowCount = 0;

  // user.streak.forEach((streak, index) => {
  //     if (index % 7 === 0 && index !== 0) {
  //         table.appendChild(row);
  //         row = document.createElement('tr');
  //         rowCount = 0;
  //     }

  //     let cell = document.createElement('td');
  //     let box = document.createElement('div');

  //     box.className = streak ? 'green' : 'grey';
  //     cell.appendChild(box);
  //     row.appendChild(cell);
  //     rowCount++;
  // });

  // // Append the last row if it has less than 7 cells
  // if (rowCount > 0) {
  //     table.appendChild(row);
  // }

}

function displayMonthStreak(monthStreak, monthName) {
  let month = document.createElement('div');
  month.setAttribute('class', 'month-box');
  let title = document.createElement('h3');
  title.textContent = monthName;
  month.appendChild(title);
  let table = document.createElement('table');
  let row = document.createElement('tr');
  let rowCount = 0;

  monthStreak.forEach((streak, index) => {
      if (index % 7 === 0 && index !== 0) {
          table.appendChild(row);
          row = document.createElement('tr');
          rowCount = 0;
      }

      let cell = document.createElement('td');
      let box = document.createElement('div');

      box.className = streak ? 'green' : 'grey';
      cell.appendChild(box);
      row.appendChild(cell);
      rowCount++;
  });

  // Append the last row if it has less than 7 cells
  if (rowCount > 0) {
      table.appendChild(row);
  }

  let header = document.createElement('h3');
  // header.textContent = `${month}`;
  document.getElementById('streak-boxes').appendChild(header);
  table.setAttribute('class', 'month-streak');
  month.appendChild(table);
  return month;

}