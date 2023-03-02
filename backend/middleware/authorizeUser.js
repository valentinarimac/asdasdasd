const jwt = require("jsonwebtoken");
const params = require("../params");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, params.SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized - no token!");
  }
});

module.exports = verifyToken;
