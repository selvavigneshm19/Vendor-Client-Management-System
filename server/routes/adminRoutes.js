const express = require("express");
const router = express.Router();

const {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    getAdminStats,
} = require("../controllers/adminController");

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

// ======================================
// Dashboard Statistics
// ======================================
router.get(
    "/stats",
    protect,
    authorize("superadmin"),
    getAdminStats
);

// ======================================
// Get All Admins
// ======================================
router.get(
    "/",
    protect,
    authorize("superadmin"),
    getAdmins
);

// ======================================
// Get Admin By ID
// ======================================
router.get(
    "/:id",
    protect,
    authorize("superadmin"),
    getAdminById
);

// ======================================
// Create Admin
// ======================================
router.post(
    "/",
    protect,
    authorize("superadmin"),
    createAdmin
);

// ======================================
// Update Admin
// ======================================
router.put(
    "/:id",
    protect,
    authorize("superadmin"),
    updateAdmin
);

// ======================================
// Delete Admin
// ======================================
router.delete(
    "/:id",
    protect,
    authorize("superadmin"),
    deleteAdmin
);

module.exports = router;