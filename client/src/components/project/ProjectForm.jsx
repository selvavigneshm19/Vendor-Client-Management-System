import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createProject,
  updateProject,
} from "../../services/projectService";

import { getVendors } from "../../services/vendorService";
import { getClients } from "../../services/clientService";

const ProjectForm = ({
  initialData = null,
  isEdit = false,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [vendors, setVendors] = useState([]);
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    vendor: "",
    client: "",
    projectManager: "",
    startDate: "",
    endDate: "",
    budget: "",
    status: "Planning",
    description: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const vendorData = await getVendors();
        const clientData = await getClients();

        setVendors(vendorData.vendors || []);
        setClients(clientData.clients || []);

      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        projectName: initialData.projectName || "",
        projectCode: initialData.projectCode || "",
        vendor: initialData.vendor?._id || "",
        client: initialData.client?._id || "",
        projectManager: initialData.projectManager || "",
        startDate: initialData.startDate
          ? initialData.startDate.substring(0, 10)
          : "",
        endDate: initialData.endDate
          ? initialData.endDate.substring(0, 10)
          : "",
        budget: initialData.budget || "",
        status: initialData.status || "Planning",
        description: initialData.description || "",
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

      if (isEdit) {
        await updateProject(initialData._id, formData);

        alert("Project updated successfully");
      } else {
        await createProject(formData);

        alert("Project created successfully");
      }

      navigate("/dashboard/projects");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save project"
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
              {/* Project Name */}
        <div>
          <label className="block text-gray-300 mb-2">
            Project Name *
          </label>

          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        {/* Project Code */}
        <div>
          <label className="block text-gray-300 mb-2">
            Project Code *
          </label>

          <input
            type="text"
            name="projectCode"
            value={formData.projectCode}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        {/* Vendor */}
        <div>
          <label className="block text-gray-300 mb-2">
            Vendor *
          </label>

          <select
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          >
            <option value="">Select Vendor</option>

            {vendors.map((vendor) => (
              <option
                key={vendor._id}
                value={vendor._id}
              >
                {vendor.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* Client */}
        <div>
          <label className="block text-gray-300 mb-2">
            Client *
          </label>

          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          >
            <option value="">Select Client</option>

            {clients.map((client) => (
              <option
                key={client._id}
                value={client._id}
              >
                {client.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* Project Manager */}
        <div>
          <label className="block text-gray-300 mb-2">
            Project Manager *
          </label>

          <input
            type="text"
            name="projectManager"
            value={formData.projectManager}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-gray-300 mb-2">
            Budget *
          </label>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-300 mb-2">
            Start Date *
          </label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-300 mb-2">
            End Date *
          </label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        {/* Status */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
                {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">
            Description
          </label>

          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          onClick={() => navigate("/dashboard/projects")}
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
            ? "Update Project"
            : "Save Project"}
        </button>

      </div>

    </form>
  );
};

export default ProjectForm;
      