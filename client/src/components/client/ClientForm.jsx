import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createClient,
  updateClient,
} from "../../services/clientService";

import { getVendors } from "../../services/vendorService";

const ClientForm = ({
  initialData = null,
  isEdit = false,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [vendors, setVendors] = useState([]);

  const [formData, setFormData] = useState({
    companyName: "",
    clientCode: "",
    contactPerson: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    gstNumber: "",
    industry: "Other",
    vendor: "",
    website: "",
    status: "Active",
    notes: "",
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName || "",
        clientCode: initialData.clientCode || "",
        contactPerson: initialData.contactPerson || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        alternatePhone: initialData.alternatePhone || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "India",
        pincode: initialData.pincode || "",
        gstNumber: initialData.gstNumber || "",
        industry: initialData.industry || "Other",
        vendor: initialData.vendor?._id || "",
        website: initialData.website || "",
        status: initialData.status || "Active",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data.vendors || []);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  };

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
        await updateClient(initialData._id, formData);
        alert("Client updated successfully");
      } else {
        await createClient(formData);
        alert("Client created successfully");
      }

      navigate("/dashboard/clients");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
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

        {/* Company Name */}
        <div>
          <label className="block text-gray-300 mb-2">
            Company Name *
          </label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* Client Code */}
        <div>
          <label className="block text-gray-300 mb-2">
            Client Code *
          </label>

          <input
            type="text"
            name="clientCode"
            value={formData.clientCode}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-gray-300 mb-2">
            Contact Person *
          </label>

          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
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
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
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
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
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

        {/* Vendor */}
        <div>
          <label className="block text-gray-300 mb-2">
            Vendor *
          </label>

          <select
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
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

        {/* City */}
        <div>
          <label className="block text-gray-300 mb-2">
            City *
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-300 mb-2">
            State *
          </label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-300 mb-2">
            Country
          </label>

          <input
            type="text"
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
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-gray-300 mb-2">
            Website
          </label>

          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* GST */}
        <div>
          <label className="block text-gray-300 mb-2">
            GST Number
          </label>

          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-gray-300 mb-2">
            Industry
          </label>

          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>IT</option>
            <option>Manufacturing</option>
            <option>Healthcare</option>
            <option>Finance</option>
            <option>Education</option>
            <option>Retail</option>
            <option>Construction</option>
            <option>Other</option>
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
          </select>
        </div>
                {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">
            Address *
          </label>

          <textarea
            name="address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">
            Notes
          </label>

          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
        </div>

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          onClick={() => navigate("/dashboard/clients")}
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
            ? "Update Client"
            : "Save Client"}
        </button>

      </div>

    </form>
  );
};

export default ClientForm;