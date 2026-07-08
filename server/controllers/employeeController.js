const Employee = require("../models/Employee");
const Project = require("../models/Project");

// =======================================
// Create Employee
// =======================================
const createEmployee = async (req, res) => {
  try {
    console.log("========== CREATE EMPLOYEE ==========");
    console.log("Request Body:", req.body);
    console.log("Logged-in User:", req.user);

    const {
      employeeName,
      employeeCode,
      email,
      phone,
      alternatePhone,
      gender,
      dateOfBirth,
      joiningDate,
      designation,
      department,
      employmentType,
      salary,
      project,
      manager,
      address,
      city,
      state,
      country,
      pincode,
      emergencyContactName,
      emergencyContactPhone,
      bloodGroup,
      skills,
      status,
      notes,
    } = req.body;

    // Required Fields
    if (
      !employeeName ||
      !employeeCode ||
      !email ||
      !phone ||
      !gender ||
      !dateOfBirth ||
      !joiningDate ||
      !designation ||
      !salary ||
      !project ||
      !address ||
      !city ||
      !state
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Employee Code Exists
    const employeeCodeExists = await Employee.findOne({ employeeCode });

    if (employeeCodeExists) {
      return res.status(400).json({
        success: false,
        message: "Employee code already exists",
      });
    }

    // Email Exists
    const emailExists = await Employee.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Employee email already exists",
      });
    }

    // Project Exists
    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const employee = await Employee.create({
      employeeName,
      employeeCode,
      email,
      phone,
      alternatePhone,
      gender,
      dateOfBirth,
      joiningDate,
      designation,
      department,
      employmentType,
      salary,
      project,
      manager,
      address,
      city,
      state,
      country,
      pincode,
      emergencyContactName,
      emergencyContactPhone,
      bloodGroup,
      skills,
      status,
      notes,
      createdBy: req.user._id,
    });

    const populatedEmployee = await Employee.findById(employee._id)
      .populate("project", "projectName projectCode")
      .populate("createdBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: populatedEmployee,
    });

  } catch (error) {
    console.error("========== CREATE EMPLOYEE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// =======================================
// Get All Employees
// =======================================
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("project", "projectName projectCode")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });

  } catch (error) {
    console.error("========== GET EMPLOYEES ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// =======================================
// Get Employee By ID
// =======================================
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("project", "projectName projectCode")
      .populate("createdBy", "name email role");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });

  } catch (error) {
    console.error("========== GET EMPLOYEE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// =======================================
// Update Employee
// =======================================
const updateEmployee = async (req, res) => {
  try {
    console.log("========== UPDATE EMPLOYEE ==========");
    console.log("Employee ID:", req.params.id);
    console.log("Request Body:", req.body);

    const employee = await Employee.findById(req.params.id);

    console.log("Employee Found:", employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Validate Project
    if (req.body.project) {
      const projectExists = await Project.findById(req.body.project);

      if (!projectExists) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
    }

    console.log("Updating Employee...");

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("project", "projectName projectCode")
      .populate("createdBy", "name email role");

    console.log("Updated Employee:", updatedEmployee);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });

  } catch (error) {
    console.error("========== UPDATE EMPLOYEE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// =======================================
// Delete Employee
// =======================================
const deleteEmployee = async (req, res) => {
  try {
    console.log("========== DELETE EMPLOYEE ==========");
    console.log("Employee ID:", req.params.id);

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });

  } catch (error) {
    console.error("========== DELETE EMPLOYEE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};