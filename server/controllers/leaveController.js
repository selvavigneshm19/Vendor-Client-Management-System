const Leave = require("../models/Leave");
const Employee = require("../models/Employee");
const User = require("../models/User");
// =======================================
// Create Leave
// =======================================
const createLeave = async (req, res) => {
  try {
    console.log("========== CREATE LEAVE ==========");
    console.log("Request Body:", req.body);

    const {
      employee,
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
      status,
      remarks,
    } = req.body;

    // Required Fields Validation
    if (
      !employee ||
      !leaveType ||
      !fromDate ||
      !toDate ||
      !totalDays ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Employee Exists
    const employeeExists = await Employee.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    console.log("Employee Found:", employeeExists);

    // Create Leave
    const leave = await Leave.create({
      employee,
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
      status,
      remarks,
      createdBy: req.user._id,
    });

    console.log("Leave Created:", leave);

    const populatedLeave = await Leave.findById(leave._id)
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role")
      .populate("approvedBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Leave created successfully",
      leave: populatedLeave,
    });

  } catch (error) {
    console.error("========== CREATE LEAVE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// ========================================
// Get All Leaves
// ========================================
const getLeaves = async (req, res) => {
  try {
    console.log("========== GET ALL LEAVES ==========");

    const leaves = await Leave.find()
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role")
      .populate("approvedBy", "name email role")
      .sort({ createdAt: -1 });

    console.log("Total Leaves:", leaves.length);

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });

  } catch (error) {
    console.error("========== GET ALL LEAVES ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ========================================
// Get Leave By ID
// ========================================
const getLeaveById = async (req, res) => {
  try {
    console.log("========== GET LEAVE BY ID ==========");
    console.log("Leave ID:", req.params.id);

    const leave = await Leave.findById(req.params.id)
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role")
      .populate("approvedBy", "name email role");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    console.log("Leave Found:", leave);

    res.status(200).json({
      success: true,
      leave,
    });

  } catch (error) {
    console.error("========== GET LEAVE BY ID ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// ========================================
// Update Leave
// ========================================
const updateLeave = async (req, res) => {
  try {
    console.log("========== UPDATE LEAVE ==========");
    console.log("Leave ID:", req.params.id);
    console.log("Request Body:", req.body);

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    console.log("Leave Found:", leave);

    // If employee is updated, verify it exists
    if (req.body.employee) {
      const employeeExists = await Employee.findById(req.body.employee);

      if (!employeeExists) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
    }

    // If approvedBy is updated, verify user exists
    if (req.body.approvedBy) {
      const approvedUser = await User.findById(req.body.approvedBy);

      if (!approvedUser) {
        return res.status(404).json({
          success: false,
          message: "Approver not found",
        });
      }
    }

    console.log("Updating Leave...");

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role")
      .populate("approvedBy", "name email role");

    console.log("Leave Updated Successfully");

    res.status(200).json({
      success: true,
      message: "Leave updated successfully",
      leave: updatedLeave,
    });

  } catch (error) {
    console.error("========== UPDATE LEAVE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// ========================================
// Delete Leave
// ========================================
const deleteLeave = async (req, res) => {
  try {
    console.log("========== DELETE LEAVE ==========");
    console.log("Leave ID:", req.params.id);

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    console.log("Leave Found:", leave);

    await Leave.findByIdAndDelete(req.params.id);

    console.log("Leave Deleted Successfully");

    res.status(200).json({
      success: true,
      message: "Leave deleted successfully",
    });

  } catch (error) {
    console.error("========== DELETE LEAVE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  createLeave,
  getLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
};