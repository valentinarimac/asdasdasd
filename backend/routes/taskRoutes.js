const express = require("express");
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const verifyToken = require("../middleware/authorizeUser");
const router = express.Router();

router.get("/:idList/", verifyToken, getTasks);
router.post("/:idList/", verifyToken, setTask);
router.put("/:idList/:id", verifyToken, updateTask);
router.delete("/:idList/:id", verifyToken, deleteTask);

module.exports = router;
