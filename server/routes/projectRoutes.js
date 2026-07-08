const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// ===============================
// Create Project
// POST /api/projects
// ===============================
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  createProject
);

// ===============================
// Get All Projects
// GET /api/projects
// ===============================
router.get(
  "/",
  protect,
  authorize("superadmin", "admin"),
  getProjects
);

router.get(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  getProjectById
);

// Update Project
router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  updateProject
);

// Delete Project
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  deleteProject
);

module.exports = router;