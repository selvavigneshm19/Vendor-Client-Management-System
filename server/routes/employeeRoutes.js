const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Employee
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createEmployee
);

// Get All Employees
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getEmployees
);

// Get Employee By ID
router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getEmployeeById
);

router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updateEmployee
);

// Delete Employee
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deleteEmployee
);
module.exports = router;