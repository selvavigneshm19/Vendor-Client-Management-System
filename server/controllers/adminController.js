const User = require("../models/User");
const bcrypt = require("bcryptjs");

// =======================================
// Create Admin
// =======================================
const createAdmin = async (req, res) => {
    try {
        console.log("========== CREATE ADMIN ==========");

        const {
            name,
            email,
            password,
            isActive,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            isActive:
                isActive !== undefined ? isActive : true,
        });

        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =======================================
// Get All Admins
// =======================================
const getAdmins = async (req, res) => {
    try {

        const admins = await User.find({
            role: "admin",
        })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: admins.length,
            admins,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================================
// Get Admin By ID
// =======================================
const getAdminById = async (req, res) => {
    try {

        const admin = await User.findOne({
            _id: req.params.id,
            role: "admin",
        }).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        res.status(200).json({
            success: true,
            admin,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================================
// Update Admin
// =======================================
const updateAdmin = async (req, res) => {
    try {

        const admin = await User.findOne({
            _id: req.params.id,
            role: "admin",
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(
                req.body.password,
                10
            );
        }

        const updatedAdmin = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Admin updated successfully",
            admin: updatedAdmin,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================================
// Delete Admin
// =======================================
const deleteAdmin = async (req, res) => {
    try {

        const admin = await User.findOne({
            _id: req.params.id,
            role: "admin",
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================================
// Admin Dashboard Stats
// =======================================
const getAdminStats = async (req, res) => {
    try {

        const totalAdmins = await User.countDocuments({
            role: "admin",
        });

        const activeAdmins = await User.countDocuments({
            role: "admin",
            isActive: true,
        });

        const inactiveAdmins = await User.countDocuments({
            role: "admin",
            isActive: false,
        });

        res.status(200).json({
            success: true,
            stats: {
                totalAdmins,
                activeAdmins,
                inactiveAdmins,
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

module.exports = {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    getAdminStats,
};