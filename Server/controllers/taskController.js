// controllers/taskController.js

const Task = require('../models/taskModel');

// GET all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new task
const createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    completed: false
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a task
const updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };