const Client = require("../models/Client");
const Vendor = require("../models/Vendor");

// Create Client
const createClient = async (req, res) => {
  try {
    const {
      companyName,
      clientCode,
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
      industry,
      vendor,
      website,
      notes,
    } = req.body;

    // Validate required fields
    if (
      !companyName ||
      !clientCode ||
      !contactPerson ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !vendor
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check Client Code
    const clientCodeExists = await Client.findOne({ clientCode });

    if (clientCodeExists) {
      return res.status(400).json({
        success: false,
        message: "Client code already exists",
      });
    }

    // Check Email
    const emailExists = await Client.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Client email already exists",
      });
    }

    // Check Vendor
    const vendorExists = await Vendor.findById(vendor);

    if (!vendorExists) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Create Client
    const client = await Client.create({
      companyName,
      clientCode,
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
      industry,
      vendor,
      website,
      notes,
      createdBy: req.user._id,
    });

    // Populate Vendor & CreatedBy
    const populatedClient = await Client.findById(client._id)
      .populate("vendor", "companyName vendorCode")
      .populate("createdBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client: populatedClient,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .populate("vendor", "companyName vendorCode")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      clients,
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

// Get Client By ID
const getClientById = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Client ID",
      });
    }

    const client = await Client.findById(req.params.id)
      .populate("vendor", "companyName vendorCode")
      .populate("createdBy", "name email role");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      client,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Client
const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const {
      companyName,
      clientCode,
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
      industry,
      vendor,
      website,
      notes,
      status,
    } = req.body;

    // Check duplicate client code
    if (clientCode && clientCode !== client.clientCode) {
      const codeExists = await Client.findOne({ clientCode });

      if (codeExists) {
        return res.status(400).json({
          success: false,
          message: "Client code already exists",
        });
      }
    }

    // Check duplicate email
    if (email && email !== client.email) {
      const emailExists = await Client.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Client email already exists",
        });
      }
    }

    // Check vendor exists
    if (vendor) {
      const vendorExists = await Vendor.findById(vendor);

      if (!vendorExists) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        companyName,
        clientCode,
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
        industry,
        vendor,
        website,
        notes,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("vendor", "companyName vendorCode")
      .populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Client
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
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
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};