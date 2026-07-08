const express = require("express");
const router = express.Router();

const {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Create Vendor
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createVendor
);

// Get All Vendors
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getAllVendors
);

// Get Vendor By ID
router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getVendorById
);

// Update Vendor
router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updateVendor
);

// Delete Vendor
router.delete(
  "/:id",
  protect,
  authorize("superadmin"),
  deleteVendor
);

module.exports = router;