const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
    },

    employeeCode: {
      type: String,
      required: [true, "Employee code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    alternatePhone: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
  type: String,
  enum: [
    "Engineering",
    "Development",
    "UI/UX",
    "QA",
    "Testing",
    "HR",
    "Finance",
    "Marketing",
    "Sales",
    "Support",
    "Operations",
    "Management",
    "Other",
  ],
  default: "Engineering",
},

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Contract",
        "Intern",
      ],
      default: "Full Time",
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    // Relationship with Project
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    manager: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    pincode: {
      type: String,
      default: "",
    },

    emergencyContactName: {
      type: String,
      default: "",
    },

    emergencyContactPhone: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
      default: "O+",
    },

    skills: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
        "On Leave",
        "Resigned",
      ],
      default: "Active",
    },

    notes: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);