const Vendor = require("../models/Vendor");

// Create Vendor
const createVendor = async (req, res) => {
  try {
    const {
      companyName,
      vendorCode,
      contactPerson,
      email,
      phone,
      alternatePhone,
      address,
      city,
      state,
      country,
      pincode,
      gstNumber,
      panNumber,
      serviceType,
      website,
      notes,
    } = req.body;

    // Check required fields
    if (
      !companyName ||
      !vendorCode ||
      !contactPerson ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !serviceType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check vendor code
    const vendorExists = await Vendor.findOne({ vendorCode });

    if (vendorExists) {
      return res.status(400).json({
        success: false,
        message: "Vendor code already exists",
      });
    }

    // Check email
    const emailExists = await Vendor.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Vendor email already exists",
      });
    }

    // Create vendor
    const vendor = await Vendor.create({
      companyName,
      vendorCode,
      contactPerson,
      email,
      phone,
      alternatePhone,
      address,
      city,
      state,
      country,
      pincode,
      gstNumber,
      panNumber,
      serviceType,
      website,
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendor,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const mongoose = require("mongoose");

// Get Vendor By ID
const getVendorById = async (req, res) => {
  try {
    console.log("Requested ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Vendor ID",
      });
    }

    const vendor = await Vendor.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    console.log("Vendor:", vendor);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Vendor
const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const {
      companyName,
      vendorCode,
      contactPerson,
      email,
      phone,
      alternatePhone,
      address,
      city,
      state,
      country,
      pincode,
      gstNumber,
      panNumber,
      serviceType,
      website,
      notes,
      status,
    } = req.body;

    // Check duplicate vendor code
    if (vendorCode && vendorCode !== vendor.vendorCode) {
      const codeExists = await Vendor.findOne({ vendorCode });

      if (codeExists) {
        return res.status(400).json({
          success: false,
          message: "Vendor code already exists",
        });
      }
    }

    // Check duplicate email
    if (email && email !== vendor.email) {
      const emailExists = await Vendor.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Vendor email already exists",
        });
      }
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        companyName,
        vendorCode,
        contactPerson,
        email,
        phone,
        alternatePhone,
        address,
        city,
        state,
        country,
        pincode,
        gstNumber,
        panNumber,
        serviceType,
        website,
        notes,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      vendor: updatedVendor,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Vendor
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    await Vendor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};