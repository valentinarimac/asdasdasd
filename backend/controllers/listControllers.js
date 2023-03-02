const asyncHandler = require("express-async-handler");
const List = require("../models/List");
const Task = require("../models/Task");
const User = require("../models/User");

const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });
  res.status(200).json(lists);
});

const setList = asyncHandler(async (req, res) => {
  if (!req.body.name) res.status(400).json({ message: "Please set a list" });

  const list = await List.create({ name: req.body.name, user: req.user.id });
  res.status(200).json(list);
});

const updateList = asyncHandler(async (req, res) => {
  let list;
  try {
    list = await List.findById(req.params.id);
  } catch {
    res.status(400);
    throw new Error("List not found!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (list.user !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedList);
});

const deleteList = asyncHandler(async (req, res) => {
  let list, tasks;
  try {
    list = await List.findById(req.params.id);
    tasks = await Task.find({ list: req.params.id });
  } catch {
    res.status(400);
    throw new Error("List not found!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (list.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  await list.remove();

  if (tasks.length) {
    await Task.deleteMany({ list: req.params.id });
  }

  res.status(200).json(req.params.id);
});

module.exports = {
  getLists,
  setList,
  updateList,
  deleteList,
};
