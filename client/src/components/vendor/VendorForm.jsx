// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { createVendor } from "../../services/vendorService";

// const VendorForm = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     companyName: "",
//     vendorCode: "",
//     contactPerson: "",
//     email: "",
//     phone: "",
//     alternatePhone: "",
//     website: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//     gstNumber: "",
//     panNumber: "",
//     serviceType: "",
//     status: "Active",
//     notes: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await createVendor(formData);

//       alert("Vendor created successfully");

//       navigate("/vendors");

//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to create vendor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         <div>
//           <label className="block text-gray-300 mb-2">
//             Company Name *
//           </label>

//           <input
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             className="w-full rounded-xl bg-slate-800 p-3 text-white"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-2">
//             Contact Person *
//           </label>

//           <input
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             className="w-full rounded-xl bg-slate-800 p-3 text-white"
//             required
//           />
//         </div>

//         <div>
//   <label className="block text-gray-300 mb-2">
//     Vendor Code *
//   </label>

//   <input
//     name="vendorCode"
//     value={formData.vendorCode}
//     onChange={handleChange}
//     className="w-full rounded-xl bg-slate-800 p-3 text-white"
//     required
//   />
// </div>


//         <div>
//           <label className="block text-gray-300 mb-2">
//             Email *
//           </label>

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full rounded-xl bg-slate-800 p-3 text-white"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-2">
//             Phone *
//           </label>

//           <input
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full rounded-xl bg-slate-800 p-3 text-white"
//             required
//           />
//         </div>

//         <div>
//   <label className="block text-gray-300 mb-2">
//     City *
//   </label>

//   <input
//     name="city"
//     value={formData.city}
//     onChange={handleChange}
//     className="w-full rounded-xl bg-slate-800 p-3 text-white"
//     required
//   />
// </div>
// <div>
//   <label className="block text-gray-300 mb-2">
//     State *
//   </label>

//   <input
//     name="state"
//     value={formData.state}
//     onChange={handleChange}
//     className="w-full rounded-xl bg-slate-800 p-3 text-white"
//     required
//   />
// </div>
// <div>
//   <label className="block text-gray-300 mb-2">
//     Country
//   </label>

//   <input
//     name="country"
//     value={formData.country}
//     onChange={handleChange}
//     className="w-full rounded-xl bg-slate-800 p-3 text-white"
//   />
// </div>
// <div>
//   <label className="block text-gray-300 mb-2">
//     Pincode
//   </label>

//   <input
//     name="pincode"
//     value={formData.pincode}
//     onChange={handleChange}
//     className="w-full rounded-xl bg-slate-800 p-3 text-white"
//   />
// </div>

//         <div>
//           <label className="block text-gray-300 mb-2">
//             Website
//           </label>

//           <input
//             name="website"
//             value={formData.website}
//             onChange={handleChange}
//             className="w-full rounded-xl bg-slate-800 p-3 text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-2">
//             Service Type
//           </label>

//           <input
//             name="serviceType"
//             value={formData.serviceType}
//             onChange={handleChange}
//             className="w-full rounded-xl bg-slate-800 p-3 text-white"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-gray-300 mb-2">
//             Address
//           </label>

//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             rows="3"
//             className="w-full rounded-xl bg-slate-800 p-3 text-white"
//           />
//         </div>

//       </div>

//       <div className="flex justify-end gap-4 mt-8">

//         <button
//           type="button"
//           onClick={() => navigate("/vendors")}
//           className="px-6 py-3 rounded-xl border border-slate-700 text-white"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
//         >
//           {loading ? "Saving..." : "Save Vendor"}
//         </button>

//       </div>
//     </form>
//   );
// };

// export default VendorForm;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createVendor,
  updateVendor,
} from "../../services/vendorService";

const VendorForm = ({
  editMode = false,
  vendor = null,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    vendorCode: "",
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
    panNumber: "",
    serviceType: "",
    website: "",
    status: "Active",
    notes: "",
  });

  useEffect(() => {
    if (editMode && vendor) {
      setFormData({
        companyName: vendor.companyName || "",
        vendorCode: vendor.vendorCode || "",
        contactPerson: vendor.contactPerson || "",
        email: vendor.email || "",
        phone: vendor.phone || "",
        alternatePhone: vendor.alternatePhone || "",
        address: vendor.address || "",
        city: vendor.city || "",
        state: vendor.state || "",
        country: vendor.country || "India",
        pincode: vendor.pincode || "",
        gstNumber: vendor.gstNumber || "",
        panNumber: vendor.panNumber || "",
        serviceType: vendor.serviceType || "",
        website: vendor.website || "",
        status: vendor.status || "Active",
        notes: vendor.notes || "",
      });
    }
  }, [vendor, editMode]);

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

      if (editMode) {
        await updateVendor(vendor._id, formData);

        alert("Vendor updated successfully");
      } else {
        await createVendor(formData);

        alert("Vendor created successfully");
      }

      navigate("/dashboard/vendors");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Operation failed"
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
      <h2 className="text-3xl font-bold text-white mb-8">
        {editMode ? "Edit Vendor" : "Add New Vendor"}
      </h2>

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

        {/* Vendor Code */}

        <div>
          <label className="block text-gray-300 mb-2">
            Vendor Code *
          </label>

          <input
            type="text"
            name="vendorCode"
            value={formData.vendorCode}
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

        {/* Service Type */}

        <div>
          <label className="block text-gray-300 mb-2">
            Service Type *
          </label>

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="">Select Service</option>
            <option value="Software Development">Software Development</option>
            <option value="IT Services">IT Services</option>
            <option value="Consulting">Consulting</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Logistics">Logistics</option>
            <option value="Construction">Construction</option>
            <option value="HR Services">HR Services</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* GST Number */}

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

        {/* PAN Number */}

        <div>
          <label className="block text-gray-300 mb-2">
            PAN Number
          </label>

          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Address */}

        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">
            Address *
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={4}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white resize-none"
          />
        </div>

        {/* Notes */}

        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">
            Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl bg-slate-800 p-3 text-white resize-none"
          />
        </div>

      </div>

      <div className="flex justify-end gap-4 mt-10">

        <button
          type="button"
          onClick={() => navigate("/dashboard/vendors")}
          className="px-6 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white transition"
        >
          {loading
            ? editMode
              ? "Updating..."
              : "Saving..."
            : editMode
              ? "Update Vendor"
              : "Save Vendor"}
        </button>

      </div>

    </form>
  );
};

export default VendorForm;