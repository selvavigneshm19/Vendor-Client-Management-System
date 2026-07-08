const express = require("express");
const router = express.Router();

const {
  getDashboardReport, getEmployeeReport,getProjectReport,getPayrollReport, getAttendanceReport,
} = require("../controllers/reportController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Dashboard Report
router.get(
  "/dashboard",
  protect,
  authorize("superadmin", "admin"),
  getDashboardReport
);
// Employee Report
router.get(
  "/employees",
  protect,
  authorize("superadmin", "admin"),
  getEmployeeReport
);
// Project Report
router.get(
  "/projects",
  protect,
  authorize("superadmin", "admin"),
  getProjectReport
);
// Payroll Report
router.get(
  "/payroll",
  protect,
  authorize("superadmin", "admin"),
  getPayrollReport
);
// Attendance Report
router.get(
  "/attendance",
  protect,
  authorize("superadmin", "admin"),
  getAttendanceReport
);
module.exports = router;