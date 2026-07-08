const express = require("express");
const router = express.Router();

const { createClient, getAllClients, getClientById, updateClient, deleteClient } = require("../controllers/clientController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Create Client
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createClient
);
// Get All Clients
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getAllClients
);
// Get Client By ID
router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getClientById
);

// Update Client
router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updateClient
);

// Delete Client
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deleteClient
);

module.exports = router;