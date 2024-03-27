import React from 'react';
import './TaskTrack.css';


function TaskTrack() {
    return (
      <div>
        <h1>Is this working</h1>
      
        <div className="tasktrack">
          <div className="circle">
            <div className="ellipse" />
            <div className="completedtasks">1</div>
            <div className="tasks">3</div>
            <img className="line" alt="Line" src="https://c.animaapp.com/XoXcb4HK/img/line-1.svg" />
          </div>
        </div>
      </div>
    );
  }
  
  export default TaskTrack;