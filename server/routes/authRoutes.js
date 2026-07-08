const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated User",
    user: req.user,
  });
});

// Admin Route
router.get(
  "/admin",
  protect,
  authorize("superadmin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Super Admin",
    });
  }
);

module.exports = router;