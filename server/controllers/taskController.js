const Task = require("../models/Task");
const Employee = require("../models/Employee");
const Project = require("../models/Project");

// =======================================
// Create Task
// =======================================
const createTask = async (req, res) => {
  try {
    console.log("========== CREATE TASK ==========");
    console.log("Request Body:", req.body);

    const {
      taskTitle,
      description,
      employee,
      project,
      priority,
      status,
      startDate,
      dueDate,
      estimatedHours,
      actualHours,
      remarks,
    } = req.body;

    // Required Fields Validation
    if (
      !taskTitle ||
      !employee ||
      !project ||
      !startDate ||
      !dueDate
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

    // Check Project Exists
    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Create Task
    const task = await Task.create({
      taskTitle,
      description,
      employee,
      project,
      priority,
      status,
      startDate,
      dueDate,
      estimatedHours,
      actualHours,
      remarks,
      createdBy: req.user._id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate(
        "project",
        "projectName projectCode"
      )
      .populate(
        "createdBy",
        "name email role"
      );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: populatedTask,
    });

  } catch (error) {
    console.error("========== CREATE TASK ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Get All Tasks
// ========================================
const getTasks = async (req, res) => {
  try {
    console.log("========== GET ALL TASKS ==========");

    const tasks = await Task.find()
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate(
        "project",
        "projectName projectCode"
      )
      .populate(
        "createdBy",
        "name email role"
      )
      .sort({ createdAt: -1 });

    console.log("Total Tasks:", tasks.length);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    console.error("========== GET ALL TASKS ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Get Task By ID
// ========================================
const getTaskById = async (req, res) => {
  try {
    console.log("========== GET TASK BY ID ==========");
    console.log("Task ID:", req.params.id);

    const task = await Task.findById(req.params.id)
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate(
        "project",
        "projectName projectCode"
      )
      .populate(
        "createdBy",
        "name email role"
      );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    console.log("Task Found:", task);

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    console.error("========== GET TASK BY ID ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Update Task
// ========================================
const updateTask = async (req, res) => {
  try {
    console.log("========== UPDATE TASK ==========");
    console.log("Task ID:", req.params.id);
    console.log("Request Body:", req.body);

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    console.log("Task Found:", task);

    // Validate Employee
    if (req.body.employee) {
      const employeeExists = await Employee.findById(req.body.employee);

      if (!employeeExists) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
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

    const updatedTask = await Task.findByIdAndUpdate(
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
      .populate(
        "project",
        "projectName projectCode"
      )
      .populate(
        "createdBy",
        "name email role"
      );

    console.log("Task Updated:", updatedTask);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.error("========== UPDATE TASK ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Delete Task
// ========================================
const deleteTask = async (req, res) => {
  try {
    console.log("========== DELETE TASK ==========");
    console.log("Task ID:", req.params.id);

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    console.log("Task Found:", task);

    await Task.findByIdAndDelete(req.params.id);

    console.log("Task Deleted Successfully");

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("========== DELETE TASK ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// ========================================
// Start Task
// ========================================

const startTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = "In Progress";
    task.startedAt = new Date();

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task started successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ========================================
// Complete Task
// ========================================

const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completedAt = new Date();
    task.status = "Completed";

    if (task.startedAt) {
      const hours =
        (task.completedAt - task.startedAt) /
        (1000 * 60 * 60);

      task.actualHours = Number(hours.toFixed(2));
    }

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task completed successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  startTask,
  completeTask
};