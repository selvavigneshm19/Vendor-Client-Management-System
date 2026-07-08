const express = require("express");
const router = express.Router();

const {
  createSettings, getSettings,updateSettings,
} = require("../controllers/settingsController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Settings
router.post(
  "/",
  protect,
  authorize("superadmin"),
  createSettings
);
// Get Settings
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getSettings
);
// Update Settings
router.put(
  "/",
  protect,
  authorize("superadmin"),
  updateSettings
);
module.exports = router;