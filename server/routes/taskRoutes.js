const express = require("express");
const router = express.Router();

const {
  createTask,getTasks,getTaskById, updateTask,deleteTask,
} = require("../controllers/taskController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Task
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createTask
);
// Get All Tasks
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getTasks
);
// Get Task By ID
router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getTaskById
);
// Update Task
router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updateTask
);
// Delete Task
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deleteTask
);
module.exports = router;