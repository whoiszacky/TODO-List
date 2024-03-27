import React, { useState, useEffect } from 'react';
import './App.css';
//import SubmitForm from './components/submitForm';
import TaskList from './components/TaskList';

function getDayAndTime() {
  const currentDate = new Date();
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
  const dayAndTime = currentDate.toLocaleString('en-US', options);
  return dayAndTime;
}


function getFormattedTime(currentDate) {
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return currentDate.toLocaleString('en-US', options);
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="time" 
        style={{display: "flex", justifyContent: "center"}}>
        <p >{getFormattedTime(currentTime)}</p>
      </div> 
      
      <TaskList/>
      

      
      
    </div>

/*      <div className="centered-content">
        <h1>woow shit is working</h1>
        
        
       
        <SubmitForm />
      </div>*/
    
  );
}

export default App;