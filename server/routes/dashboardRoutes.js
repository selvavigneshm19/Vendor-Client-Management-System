const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,getRecentActivities,getDashboardCharts,
} = require("../controllers/dashboardController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");
// Summary
router.get(
  "/summary",
  protect,
  authorize("superadmin", "admin"),
  getDashboardSummary
);
// Recent Activities
router.get(
  "/recent-activities",
  protect,
  authorize("superadmin", "admin"),
  getRecentActivities
);
// Dashboard Charts
router.get(
  "/charts",
  protect,
  authorize("superadmin", "admin"),
  getDashboardCharts
);

module.exports = router;