const Employee = require("../models/Employee");
const Project = require("../models/Project");
const Payroll = require("../models/Payroll");
const Attendance = require("../models/Attendance");

// ======================================
// Dashboard Report
// ======================================
const getDashboardReport = async (req, res) => {
  try {
    console.log("========== DASHBOARD REPORT ==========");

    const totalEmployees = await Employee.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalAttendance = await Attendance.countDocuments();
    const totalPayroll = await Payroll.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$netSalary" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      report: {
        totalEmployees,
        totalProjects,
        totalAttendance,
        totalPayroll:
          totalPayroll.length > 0
            ? totalPayroll[0].totalSalary
            : 0,
      },
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
// Employee Report
// ======================================
const getEmployeeReport = async (req, res) => {
  try {
    console.log("========== EMPLOYEE REPORT ==========");

    const employees = await Employee.find()
      .populate(
        "project",
        "projectName projectCode"
      )
      .populate(
        "createdBy",
        "name email role"
      )
      .sort({ employeeName: 1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      report: employees,
    });

  } catch (error) {
    console.error("========== EMPLOYEE REPORT ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Project Report
// ======================================
const getProjectReport = async (req, res) => {
  try {
    console.log("========== PROJECT REPORT ==========");

    const projects = await Project.find()
      .populate("client", "companyName clientCode")
      .populate("vendor", "companyName vendorCode")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      report: projects,
    });

  } catch (error) {
    console.error("========== PROJECT REPORT ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Payroll Report
// ======================================
const getPayrollReport = async (req, res) => {
  try {
    console.log("========== PAYROLL REPORT ==========");

    const payrolls = await Payroll.find()
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate(
        "createdBy",
        "name email role"
      )
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      count: payrolls.length,
      report: payrolls,
    });

  } catch (error) {
    console.error("========== PAYROLL REPORT ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Attendance Report
// ======================================
const getAttendanceReport = async (req, res) => {
  try {
    console.log("========== ATTENDANCE REPORT ==========");

    const attendance = await Attendance.find()
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate(
        "createdBy",
        "name email role"
      )
      .sort({ attendanceDate: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      report: attendance,
    });

  } catch (error) {
    console.error("========== ATTENDANCE REPORT ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getDashboardReport,
  getEmployeeReport,
  getProjectReport,
  getPayrollReport,
   getAttendanceReport,
};