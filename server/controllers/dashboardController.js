const Vendor = require("../models/Vendor");
const Client = require("../models/Client");
const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Payroll = require("../models/Payroll");
const Task = require("../models/Task");

// ======================================
// Dashboard Summary
// ======================================
const getDashboardSummary = async (req, res) => {
  try {
    console.log("========== DASHBOARD SUMMARY ==========");

    const [
      totalVendors,
      totalClients,
      totalProjects,
      totalEmployees,
      activeProjects,
      presentEmployees,
      pendingLeaves,
      pendingTasks,
      completedTasks,
      payrolls,
    ] = await Promise.all([
      Vendor.countDocuments(),
      Client.countDocuments(),
      Project.countDocuments(),
      Employee.countDocuments(),
      Project.countDocuments({ status: "In Progress" }),
      Attendance.countDocuments({ status: "Present" }),
      Leave.countDocuments({ status: "Pending" }),
      Task.countDocuments({ status: "Pending" }),
      Task.countDocuments({ status: "Completed" }),
      Payroll.find(),
    ]);

    const monthlyPayroll = payrolls.reduce(
      (sum, payroll) => sum + payroll.netSalary,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalVendors,
        totalClients,
        totalProjects,
        totalEmployees,
        activeProjects,
        presentEmployees,
        pendingLeaves,
        pendingTasks,
        completedTasks,
        monthlyPayroll,
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
// Recent Activities
// ======================================
const getRecentActivities = async (req, res) => {
  try {
    console.log("========== RECENT ACTIVITIES ==========");

    const recentEmployees = await Employee.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("employeeName employeeCode designation createdAt");

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("projectName projectCode status createdAt");

    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("taskTitle status priority createdAt")
      .populate("employee", "employeeName");

    const recentLeaves = await Leave.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("leaveType status fromDate toDate createdAt")
      .populate("employee", "employeeName");

    res.status(200).json({
      success: true,
      data: {
        recentEmployees,
        recentProjects,
        recentTasks,
        recentLeaves,
      },
    });

  } catch (error) {
    console.error("========== RECENT ACTIVITIES ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Dashboard Charts
// ======================================
const getDashboardCharts = async (req, res) => {
  try {
    console.log("========== DASHBOARD CHARTS ==========");

    // Employees by Department
    const employeesByDepartment = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          count: 1,
        },
      },
      {
        $sort: { department: 1 },
      },
    ]);

    // Projects by Status
    const projectsByStatus = await Project.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    // Tasks by Status
    const tasksByStatus = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    // Payroll by Month
    const payrollByMonth = await Payroll.aggregate([
      {
        $group: {
          _id: "$month",
          totalSalary: {
            $sum: "$netSalary",
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalSalary: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        employeesByDepartment,
        projectsByStatus,
        tasksByStatus,
        payrollByMonth,
      },
    });

  } catch (error) {
    console.error("========== DASHBOARD CHARTS ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getDashboardSummary,
  getRecentActivities,
  getDashboardCharts,
};