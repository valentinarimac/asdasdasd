const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    list: req.params.idList,
  });
  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text)
    res.status(400).json({ message: `Set task in list ${req.params.idList}` });

  const task = await Task.create({
    text: req.body.text,
    list: req.params.idList,
    checkbox: false,
  });
  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    await Task.findById(req.params.id);
  } catch {
    res.status(400);
    throw new Error("Task not found!");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
  } catch {
    res.status(400);
    throw new Error("Task not found!");
  }
  await task.remove();
  res.status(200).json(req.params.id);
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
