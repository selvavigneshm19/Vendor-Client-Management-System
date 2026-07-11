const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  startTask,
  completeTask
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
// Start Task
router.put(
  "/:id/start",
  protect,
  authorize("superadmin", "admin"),
  startTask
);

// Complete Task
router.put(
  "/:id/complete",
  protect,
  authorize("superadmin", "admin"),
  completeTask
);
module.exports = router;