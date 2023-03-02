const express = require("express");
const {
  getLists,
  setList,
  updateList,
  deleteList,
} = require("../controllers/listControllers");
const verifyToken = require("../middleware/authorizeUser");
const router = express.Router();

router.get("/", verifyToken, getLists);
router.post("/", verifyToken, setList);
router.put("/:id", verifyToken, updateList);
router.delete("/:id", verifyToken, deleteList);

module.exports = router;
