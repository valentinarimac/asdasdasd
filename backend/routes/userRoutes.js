const express = require("express");
const {
  registerUser,
  login,
  getUser,
} = require("../controllers/userControllers");
const verifyToken = require("../middleware/authorizeUser");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", login);
router.get("/me", verifyToken, getUser);

module.exports = router;
