const Project = require("../models/Project");
const Vendor = require("../models/Vendor");
const Client = require("../models/Client");

// ===============================
// Create Project
// ===============================
const createProject = async (req, res) => {
    try {
        console.log("========== CREATE PROJECT ==========");
        console.log("Request Body:", req.body);
        console.log("Logged-in User:", req.user);

        const {
            projectName,
            projectCode,
            client,
            vendor,
            projectManager,
            startDate,
            endDate,
            budget,
            status,
            description,
        } = req.body;

        // Required fields validation
        if (
            !projectName ||
            !projectCode ||
            !client ||
            !vendor ||
            !projectManager ||
            !startDate ||
            !endDate ||
            !budget
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Check duplicate project code
        const projectExists = await Project.findOne({ projectCode });

        console.log("Project Exists:", projectExists);

        if (projectExists) {
            return res.status(400).json({
                success: false,
                message: "Project code already exists",
            });
        }

        // Check Client
        const clientExists = await Client.findById(client);

        console.log("Client Found:", clientExists);

        if (!clientExists) {
            return res.status(404).json({
                success: false,
                message: "Client not found",
            });
        }

        // Check Vendor
        const vendorExists = await Vendor.findById(vendor);

        console.log("Vendor Found:", vendorExists);

        if (!vendorExists) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        console.log("Creating Project...");

        // Create Project
        const project = await Project.create({
            projectName,
            projectCode,
            client,
            vendor,
            projectManager,
            startDate,
            endDate,
            budget,
            status,
            description,
            createdBy: req.user._id,
        });

        console.log("Project Created:", project);

        const populatedProject = await Project.findById(project._id)
            .populate("client", "companyName clientCode")
            .populate("vendor", "companyName vendorCode")
            .populate("createdBy", "name email role");

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: populatedProject,
        });
    } catch (error) {
        console.log("========== ERROR ==========");
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack,
        });
    }
};

// ===============================
// Get All Projects
// ===============================
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("client", "companyName clientCode")
            .populate("vendor", "companyName vendorCode")
            .populate("createdBy", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            projects,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ===============================
// Get Project By ID
// ===============================
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "companyName clientCode")
      .populate("vendor", "companyName vendorCode")
      .populate("createdBy", "name email role");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// =======================================
// Update Project
// =======================================
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const {
      projectName,
      projectCode,
      client,
      vendor,
      projectManager,
      startDate,
      endDate,
      budget,
      status,
      description,
    } = req.body;

    // Check duplicate project code
    if (projectCode && projectCode !== project.projectCode) {
      const exists = await Project.findOne({ projectCode });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Project code already exists",
        });
      }
    }

    // Validate Client
    if (client) {
      const clientExists = await Client.findById(client);

      if (!clientExists) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }
    }

    // Validate Vendor
    if (vendor) {
      const vendorExists = await Vendor.findById(vendor);

      if (!vendorExists) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }
    }

    project.projectName = projectName || project.projectName;
    project.projectCode = projectCode || project.projectCode;
    project.client = client || project.client;
    project.vendor = vendor || project.vendor;
    project.projectManager = projectManager || project.projectManager;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.budget = budget ?? project.budget;
    project.status = status || project.status;
    project.description = description || project.description;

    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate("client", "companyName clientCode")
      .populate("vendor", "companyName vendorCode")
      .populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================================
// Delete Project
// =======================================
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
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
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};