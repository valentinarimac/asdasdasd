const jwt = require("jsonwebtoken");
const params = require("../params");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists!");
  }

  // bcrypt hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);

  const registeredUser = await User.create({
    name,
    email,
    password: hashedPwd,
  });

  if (registeredUser) {
    res.status(201).json({
      _id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
      token: generateToken(registeredUser._id),
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    res.status(400);
    throw new Error("User not found!");
  }

  if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
    res.status(200).json({
      _id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      token: generateToken(checkUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong data!");
  }
});

// get user's data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, params.SECRET, { expiresIn: "10d" });
};

module.exports = {
  registerUser,
  login,
  getUser,
};
