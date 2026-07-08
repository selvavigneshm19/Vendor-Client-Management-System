const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    companyPhone: {
      type: String,
      required: true,
      trim: true,
    },

    companyWebsite: {
      type: String,
      default: "",
      trim: true,
    },

    companyAddress: {
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

    currency: {
      type: String,
      default: "INR",
    },

    timeZone: {
      type: String,
      default: "Asia/Kolkata",
    },

    dateFormat: {
      type: String,
      enum: [
        "DD/MM/YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
      ],
      default: "DD/MM/YYYY",
    },

    language: {
      type: String,
      default: "English",
    },

    theme: {
      type: String,
      enum: [
        "Light",
        "Dark",
      ],
      default: "Light",
    },

    companyLogo: {
      type: String,
      default: "",
    },

    emailNotifications: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model("Settings", settingsSchema);