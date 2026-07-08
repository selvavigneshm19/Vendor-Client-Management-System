const Payroll = require("../models/Payroll");
const Employee = require("../models/Employee");

// =======================================
// Create Payroll
// =======================================
const createPayroll = async (req, res) => {
  try {
    console.log("========== CREATE PAYROLL ==========");
    console.log("Request Body:", req.body);

    const {
      employee,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      bonus,
      netSalary,
      paymentStatus,
      paymentDate,
      remarks,
    } = req.body;

    // Required Fields Validation
    if (
      !employee ||
      !month ||
      !year ||
      basicSalary === undefined ||
      netSalary === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check Employee Exists
    const employeeExists = await Employee.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Prevent Duplicate Payroll for same Month & Year
    const payrollExists = await Payroll.findOne({
      employee,
      month,
      year,
    });

    if (payrollExists) {
      return res.status(400).json({
        success: false,
        message: "Payroll already exists for this employee and month",
      });
    }

    // Create Payroll
    const payroll = await Payroll.create({
      employee,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      bonus,
      netSalary,
      paymentStatus,
      paymentDate,
      remarks,
      createdBy: req.user._id,
    });

    const populatedPayroll = await Payroll.findById(payroll._id)
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Payroll created successfully",
      payroll: populatedPayroll,
    });

  } catch (error) {
    console.error("========== CREATE PAYROLL ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// ========================================
// Get All Payroll
// ========================================
const getPayrolls = async (req, res) => {
  try {
    console.log("========== GET ALL PAYROLL ==========");

    const payrolls = await Payroll.find()
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    console.log("Total Payrolls:", payrolls.length);

    res.status(200).json({
      success: true,
      count: payrolls.length,
      payrolls,
    });

  } catch (error) {
    console.error("========== GET ALL PAYROLL ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Get Payroll By ID
// ========================================
const getPayrollById = async (req, res) => {
  try {
    console.log("========== GET PAYROLL BY ID ==========");
    console.log("Payroll ID:", req.params.id);

    const payroll = await Payroll.findById(req.params.id)
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role");

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    console.log("Payroll Found:", payroll);

    res.status(200).json({
      success: true,
      payroll,
    });

  } catch (error) {
    console.error("========== GET PAYROLL BY ID ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Update Payroll
// ========================================
const updatePayroll = async (req, res) => {
  try {
    console.log("========== UPDATE PAYROLL ==========");
    console.log("Payroll ID:", req.params.id);
    console.log("Request Body:", req.body);

    const payroll = await Payroll.findById(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    console.log("Payroll Found:", payroll);

    // If employee is updated, verify employee exists
    if (req.body.employee) {
      const employeeExists = await Employee.findById(req.body.employee);

      if (!employeeExists) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
    }

    const updatedPayroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        returnDocument: "after",
        runValidators: true,
      }
    )
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role");

    console.log("Payroll Updated:", updatedPayroll);

    res.status(200).json({
      success: true,
      message: "Payroll updated successfully",
      payroll: updatedPayroll,
    });

  } catch (error) {
    console.error("========== UPDATE PAYROLL ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Delete Payroll
// ========================================
const deletePayroll = async (req, res) => {
  try {
    console.log("========== DELETE PAYROLL ==========");
    console.log("Payroll ID:", req.params.id);

    const payroll = await Payroll.findById(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    console.log("Payroll Found:", payroll);

    await Payroll.findByIdAndDelete(req.params.id);

    console.log("Payroll Deleted Successfully");

    res.status(200).json({
      success: true,
      message: "Payroll deleted successfully",
    });

  } catch (error) {
    console.error("========== DELETE PAYROLL ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
module.exports = {
  createPayroll,
  getPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};