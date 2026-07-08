const express = require("express");
const router = express.Router();

const {
  createNotification,getNotifications,getMyNotifications,markNotificationAsRead,getUnreadNotificationCount,deleteNotification,
} = require("../controllers/notificationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Notification
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createNotification
);
// Get All Notifications
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getNotifications
);
// Get My Notifications
router.get(
  "/my",
  protect,
  getMyNotifications
);
// Mark Notification As Read
router.put(
  "/:id/read",
  protect,
  markNotificationAsRead
);
// Get Unread Notification Count
router.get(
  "/unread-count",
  protect,
  getUnreadNotificationCount
);
// Delete Notification
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deleteNotification
);
module.exports = router;