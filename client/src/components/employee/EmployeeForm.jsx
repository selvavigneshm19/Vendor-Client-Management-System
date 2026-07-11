import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createEmployee,
    updateEmployee,
} from "../../services/employeeService";

import { getProjects } from "../../services/projectService";

const EmployeeForm = ({
    initialData = null,
    isEdit = false,
}) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [projects, setProjects] = useState([]);

    const [formData, setFormData] = useState({
        employeeName: "",
        employeeCode: "",
        email: "",
        phone: "",
        alternatePhone: "",
        gender: "",
        dateOfBirth: "",
        joiningDate: "",
        designation: "",
        department: "Engineering",
        employmentType: "Full Time",
        salary: "",
        project: "",
        manager: "",
        address: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        bloodGroup: "O+",
        skills: "",
        status: "Active",
        notes: "",
    });

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await getProjects();

                setProjects(data.projects || []);
            } catch (error) {
                console.error(error);
            }
        };

        loadProjects();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                employeeName: initialData.employeeName || "",
                employeeCode: initialData.employeeCode || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                alternatePhone: initialData.alternatePhone || "",
                gender: initialData.gender || "",
                dateOfBirth: initialData.dateOfBirth
                    ? initialData.dateOfBirth.substring(0, 10)
                    : "",
                joiningDate: initialData.joiningDate
                    ? initialData.joiningDate.substring(0, 10)
                    : "",
                designation: initialData.designation || "",
                department: initialData.department || "Engineering",
                employmentType:
                    initialData.employmentType || "Full Time",
                salary: initialData.salary || "",
                project: initialData.project?._id || "",
                manager: initialData.manager || "",
                address: initialData.address || "",
                city: initialData.city || "",
                state: initialData.state || "",
                country: initialData.country || "India",
                pincode: initialData.pincode || "",
                emergencyContactName:
                    initialData.emergencyContactName || "",
                emergencyContactPhone:
                    initialData.emergencyContactPhone || "",
                bloodGroup: initialData.bloodGroup || "O+",
                skills: initialData.skills
                    ? initialData.skills.join(", ")
                    : "",
                status: initialData.status || "Active",
                notes: initialData.notes || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                ...formData,
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
            };

            if (isEdit) {
                await updateEmployee(initialData._id, payload);

                alert("Employee updated successfully");
            } else {
                await createEmployee(payload);

                alert("Employee created successfully");
            }

            navigate("/dashboard/employees");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to save employee"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee Name */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Employee Name *
                    </label>

                    <input
                        type="text"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Employee Code */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Employee Code *
                    </label>

                    <input
                        type="text"
                        name="employeeCode"
                        value={formData.employeeCode}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Email *
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Phone *
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Alternate Phone */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Alternate Phone
                    </label>

                    <input
                        type="text"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Gender *
                    </label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Date of Birth *
                    </label>

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Joining Date */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Joining Date *
                    </label>

                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Designation */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Designation *
                    </label>

                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Department */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Department
                    </label>

                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >
                        <option>Engineering</option>
                        <option>Development</option>
                        <option>UI/UX</option>
                        <option>QA</option>
                        <option>Testing</option>
                        <option>HR</option>
                        <option>Finance</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Support</option>
                        <option>Operations</option>
                        <option>Management</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Employment Type */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Employment Type
                    </label>

                    <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Contract</option>
                        <option>Intern</option>
                    </select>
                </div>

                {/* Salary */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Salary *
                    </label>

                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Project */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Project *
                    </label>

                    <select
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    >
                        <option value="">Select Project</option>

                        {projects.map((project) => (
                            <option
                                key={project._id}
                                value={project._id}
                            >
                                {project.projectName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Manager */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Manager
                    </label>

                    <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>
                {/* Address */}
                <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">
                        Address *
                    </label>

                    <textarea
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* City */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        City *
                    </label>

                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* State */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        State *
                    </label>

                    <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Country
                    </label>

                    <input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>

                {/* Pincode */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Pincode
                    </label>

                    <input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>

                {/* Emergency Contact Name */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Emergency Contact Name
                    </label>

                    <input
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>

                {/* Emergency Contact Phone */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Emergency Contact Phone
                    </label>

                    <input
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Blood Group
                    </label>

                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-gray-300 mb-2">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>On Leave</option>
                        <option>Resigned</option>
                    </select>
                </div>

                {/* Skills */}
                <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">
                        Skills
                    </label>

                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="React, Node.js, MongoDB"
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">
                        Notes
                    </label>

                    <textarea
                        rows="4"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />
                </div>

            </div>

            <div className="flex justify-end gap-4 mt-8">

                <button
                    type="button"
                    onClick={() => navigate("/dashboard/employees")}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
                >
                    {loading
                        ? "Saving..."
                        : isEdit
                            ? "Update Employee"
                            : "Save Employee"}
                </button>

            </div>

        </form>
    );
};

export default EmployeeForm;