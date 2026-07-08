const express = require("express");
const router = express.Router();

const {
  createAttendance,getAttendance,getAttendanceById, updateAttendance,deleteAttendance,
} = require("../controllers/attendanceController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Attendance
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createAttendance
);
// Get Attendance
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getAttendance
);
// Get Attendance By ID
router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getAttendanceById
);
// Update Attendance
router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updateAttendance
);
// Delete Attendance
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deleteAttendance
);
module.exports = router;