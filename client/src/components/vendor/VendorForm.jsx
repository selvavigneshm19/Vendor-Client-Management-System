import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createVendor } from "../../services/vendorService";

const VendorForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    gstNumber: "",
    panNumber: "",
    category: "",
    status: "Active",
    notes: "",
  });

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

      await createVendor(formData);

      alert("Vendor created successfully");

      navigate("/vendors");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create vendor");
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

        <div>
          <label className="block text-gray-300 mb-2">
            Company Name *
          </label>

          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">
            Contact Person *
          </label>

          <input
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

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

        <div>
          <label className="block text-gray-300 mb-2">
            Phone *
          </label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">
            Website
          </label>

          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">
            Category
          </label>

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          onClick={() => navigate("/vendors")}
          className="px-6 py-3 rounded-xl border border-slate-700 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
        >
          {loading ? "Saving..." : "Save Vendor"}
        </button>

      </div>
    </form>
  );
};

export default VendorForm;