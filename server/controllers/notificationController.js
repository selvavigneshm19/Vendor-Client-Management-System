const Notification = require("../models/Notification");

// ======================================
// Create Notification
// ======================================
const createNotification = async (req, res) => {
  try {
    console.log("========== CREATE NOTIFICATION ==========");

    const {
      title,
      message,
      type,
      recipient,
    } = req.body;

    if (!title || !message || !recipient) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const notification = await Notification.create({
      title,
      message,
      type,
      recipient,
      createdBy: req.user._id,
    });

    const populatedNotification = await Notification.findById(notification._id)
      .populate("recipient", "name email role")
      .populate("createdBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification: populatedNotification,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Notifications
// ======================================
const getNotifications = async (req, res) => {
  try {
    console.log("========== GET ALL NOTIFICATIONS ==========");

    const notifications = await Notification.find()
      .populate("recipient", "name email role")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Notifications
// ======================================
const getMyNotifications = async (req, res) => {
  try {
    console.log("========== GET MY NOTIFICATIONS ==========");

    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Mark Notification As Read
// ======================================
const markNotificationAsRead = async (req, res) => {
  try {
    console.log("========== MARK NOTIFICATION AS READ ==========");

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    const updatedNotification = await Notification.findById(notification._id)
      .populate("recipient", "name email role")
      .populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Unread Notification Count
// ======================================
const getUnreadNotificationCount = async (req, res) => {
  try {

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      unreadCount,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Notification
// ======================================
const deleteNotification = async (req, res) => {
  try {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getMyNotifications,
  markNotificationAsRead,
  getUnreadNotificationCount,
  deleteNotification,
};