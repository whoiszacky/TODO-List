import React, { useState, useEffect } from "react";

import "./TaskList.css";
import { IoMdAdd } from "react-icons/io"; // ad btn 
import { CiEdit } from "react-icons/ci"; // edit btn icn 
import { RiDeleteBin5Line } from "react-icons/ri"; // dlt btn icon 
import { FiSave } from "react-icons/fi";

import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState(0);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/tasks");
                setTasks(response.data);
                setCompletedTasks(response.data.filter((task) => task.completed).length);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchData();
    }, []);

    const handleAddTask = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/tasks", {
                title: newTask,
                completed: false,
            });
            setTasks([...tasks, response.data]);
            setNewTask("");
            setCompletedTasks(response.data.filter((task) => task.completed).length);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleTaskCompletion = async (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
        setCompletedTasks(updatedTasks.filter((task) => task.completed).length);
        try {
            await axios.put(`http://localhost:5000/api/tasks/${tasks[index]._id}`, updatedTasks[index]);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            const filteredTasks = tasks.filter((task) => task._id !== id);
            setTasks(filteredTasks);
            setCompletedTasks(filteredTasks.filter((task) => task.completed).length);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEditTask = (index) => {
        setEditingIndex(index);
        setEditedTaskTitle(tasks[index].title);
    };

    const handleSaveEdit = async (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].title = editedTaskTitle;
        setTasks(updatedTasks);
        setEditingIndex(null);

        try {
            await axios.put(`http://localhost:5000/api/tasks/${tasks[index]._id}`, updatedTasks[index]);
        } catch (error) {
            console.error("Error saving task edit:", error);
        }
    };

    return (
    <div className="container">
  
      <div className="content">
        <div className="task-tracker">
          <div className="tracker-text">
            <div className="circle">
              <div className="completedTasks">{completedTasks}</div>
              <span className="line"></span>
              <div className="existingTasks" style={{display: "block"}}>{tasks.length}</div>
            </div>
            
          </div>
        </div>
        <div className="add-task">
          <input className="addtask"
            type="text"
            placeholder="Write your next task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="addbtn" onClick={handleAddTask}>
           <IoMdAdd style={{fontSize:'3em', color:"black"}}/>
          </button>
        </div>
        <div className="task-list">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`task-card ${task.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(index)}
              />
              {editingIndex === index ? (
                <input
                  style={{width:"100%", border: "none", backgroundColor: "#f2f1f196", }}
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
              ) : (
                <span
                  className="task-title"
                  style={{ textDecoration: task.completed ? "line-through" : "" }}
                >
                  {task.title}
                </span>
              )}
              <div className="actions">
                {editingIndex === index ? (
                  <button style={{
                    background: "none", // Make background transparent
                    border: "none", // Remove border
                    fontSize:'1em',// Remove outline
                    padding: 0, // Set padding to 0 to remove extra spacing
                  }} onClick={() => handleSaveEdit(index)}>
                    <FiSave />
                  </button>
                ) : (
                  <button style={{
                    background: "none", // Make background transparent
                    border: "none", // Remove border
                    fontSize:'1em',// Remove outline
                    padding: 0, // Set padding to 0 to remove extra spacing
                  }} onClick={() => handleEditTask(index)}><CiEdit  style={{fontSize:'1em'}} /></button>
                )}
                <button style={{
                    background: "none", // Make background transparent
                    border: "none", // Remove border
                    fontSize:'1em',// Remove outline
                    padding: 0, // Set padding to 0 to remove extra spacing
                  }}onClick={() => handleDeleteTask(task._id)}>
                  <RiDeleteBin5Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;