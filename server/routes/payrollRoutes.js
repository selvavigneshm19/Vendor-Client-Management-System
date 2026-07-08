const express = require("express");
const router = express.Router();

const {
  createPayroll,getPayrolls,getPayrollById,updatePayroll,deletePayroll,
} = require("../controllers/payrollController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Payroll
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createPayroll
);
// Get All Payroll
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getPayrolls
);
// Get Payroll By ID
router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getPayrollById
);
// Update Payroll
router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updatePayroll
);
// Delete Payroll
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deletePayroll
);
module.exports = router;