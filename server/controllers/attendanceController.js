const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// =======================================
// Create Attendance
// =======================================
const createAttendance = async (req, res) => {
  try {
    console.log("========== CREATE ATTENDANCE ==========");
    console.log("Request Body:", req.body);

    const {
      employee,
      attendanceDate,
      checkIn,
      checkOut,
      status,
      remarks,
    } = req.body;
    let { workingHours } = req.body;

    // Required Fields Validation
    if (!employee || !attendanceDate) {
      return res.status(400).json({
        success: false,
        message: "Employee and Attendance Date are required",
      });
    }
    if (checkIn && checkOut) {
      const start = new Date(`1970-01-01T${checkIn}`);
      const end = new Date(`1970-01-01T${checkOut}`);

      workingHours = (end - start) / (1000 * 60 * 60);

      if (workingHours < 0) {
        workingHours = 0;
      }
      workingHours = Number(workingHours.toFixed(2));
    }

    // Check Employee Exists
    const employeeExists = await Employee.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Prevent Duplicate Attendance
    const attendanceExists = await Attendance.findOne({
      employee,
      attendanceDate,
    });

    if (attendanceExists) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }

    // Create Attendance
    const attendance = await Attendance.create({
      employee,
      attendanceDate,
      checkIn,
      checkOut,
      workingHours,
      status,
      remarks,
      createdBy: req.user._id,
    });

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate("employee", "employeeName employeeCode designation")
      .populate("createdBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      attendance: populatedAttendance,
    });

  } catch (error) {
    console.error("========== CREATE ATTENDANCE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// ========================================
// Get All Attendance
// ========================================
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role")
      .sort({ attendanceDate: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// ========================================
// Get Attendance By ID
// ========================================
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate(
        "employee",
        "employeeName employeeCode designation department"
      )
      .populate("createdBy", "name email role");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      attendance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ========================================
// Update Attendance
// ========================================
const updateAttendance = async (req, res) => {
  try {
    console.log("========== UPDATE ATTENDANCE ==========");
    console.log("Attendance ID:", req.params.id);
    console.log("Request Body:", req.body);

    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    console.log("Attendance Found:", attendance);

    // If employee is being changed, verify employee exists
    if (req.body.employee) {
      const employeeExists = await Employee.findById(req.body.employee);

      if (!employeeExists) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
    }

    console.log("Updating Attendance...");

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
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

    console.log("Attendance Updated:", updatedAttendance);

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance: updatedAttendance,
    });

  } catch (error) {
    console.error("========== UPDATE ATTENDANCE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ========================================
// Delete Attendance
// ========================================
const deleteAttendance = async (req, res) => {
  try {
    console.log("========== DELETE ATTENDANCE ==========");
    console.log("Attendance ID:", req.params.id);

    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    console.log("Attendance Found:", attendance);

    await Attendance.findByIdAndDelete(req.params.id);

    console.log("Attendance Deleted Successfully");

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });

  } catch (error) {
    console.error("========== DELETE ATTENDANCE ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};