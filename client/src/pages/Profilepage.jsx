import React,{useState,useEffect} from 'react'

const Profilepage = () => {
        const [streak, setStreak] = useState(0);
        const [maxStreak, setMaxStreak] = useState(0);
        const [lastUpdated, setLastUpdated] = useState(null);
      
        useEffect(() => {
          const storedMaxStreak = localStorage.getItem('maxStreak');
          if (storedMaxStreak) {
            setMaxStreak(parseInt(storedMaxStreak));
          }
        }, []);
      
        const updateStreak = () => {
          const today = new Date().toDateString();
          if (today !== lastUpdated) {
            setStreak(streak + 1);
            setLastUpdated(today);
            if (streak + 1 > maxStreak) {
              setMaxStreak(streak + 1);
              localStorage.setItem('maxStreak', streak + 1);
            }
          } else {
            alert('You can only update your streak once per day!');
          }
        };
      
        return (
          <div>
            <h2>Streak Counter</h2>
            <p>Current Streak: {streak}</p>
            <p>Max Streak: {maxStreak}</p>
            <button onClick={updateStreak}>Update Streak</button>
          </div>
        );
    }

export default Profilepage
