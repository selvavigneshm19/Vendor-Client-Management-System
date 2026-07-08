const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
        },

        vendorCode: {
            type: String,
            required: [true, "Vendor code is required"],
            unique: true,
            uppercase: true,
            trim: true,
        },

        contactPerson: {
            type: String,
            required: [true, "Contact person is required"],
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

        address: {
            type: String,
            required: [true, "Address is required"],
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
        },

        gstNumber: {
            type: String,
            default: "",
            uppercase: true,
        },

        panNumber: {
            type: String,
            default: "",
            uppercase: true,
        },

        serviceType: {
            type: String,
            required: true,
            enum: [
                "Software Development",
                "IT Services",
                "Consulting",
                "Manufacturing",
                "Logistics",
                "Construction",
                "HR Services",
                "Finance",
                "Marketing",
                "Other",
            ],
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },

        website: {
            type: String,
            default: "",
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

module.exports = mongoose.model("Vendor", vendorSchema);