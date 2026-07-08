const Settings = require("../models/Settings");

// ======================================
// Create Settings
// ======================================
const createSettings = async (req, res) => {
  try {
    console.log("========== CREATE SETTINGS ==========");
    console.log("Request Body:", req.body);

    // Only one settings document should exist
    const existingSettings = await Settings.findOne();

    if (existingSettings) {
      return res.status(400).json({
        success: false,
        message: "Settings already exist. Please update them instead.",
      });
    }

    const settings = await Settings.create({
      ...req.body,
      createdBy: req.user._id,
    });

    const populatedSettings = await Settings.findById(settings._id)
      .populate("createdBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Settings created successfully",
      settings: populatedSettings,
    });

  } catch (error) {
    console.error("========== CREATE SETTINGS ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Get Settings
// ======================================
const getSettings = async (req, res) => {
  try {
    console.log("========== GET SETTINGS ==========");

    const settings = await Settings.findOne()
      .populate("createdBy", "name email role");

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found",
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });

  } catch (error) {
    console.error("========== GET SETTINGS ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Update Settings
// ======================================
const updateSettings = async (req, res) => {
  try {
    console.log("========== UPDATE SETTINGS ==========");
    console.log("Request Body:", req.body);

    let settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found",
      });
    }

    settings = await Settings.findByIdAndUpdate(
      settings._id,
      {
        $set: req.body,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {
    console.error("========== UPDATE SETTINGS ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createSettings,
   getSettings,
   updateSettings,
};