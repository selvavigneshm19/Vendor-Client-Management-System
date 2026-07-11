const express = require("express");
const router = express.Router();

const { createLeave, getLeaves, getLeaveById, updateLeave, deleteLeave,
} = require("../controllers/leaveController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Leave
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createLeave
);
// Get All Leaves
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getLeaves
);
// Get Leave By ID
router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getLeaveById
);

// Update Leave
router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updateLeave
);
// Delete Leave
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deleteLeave
);
module.exports = router;