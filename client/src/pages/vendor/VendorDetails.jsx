// import {
//   ArrowLeft,
//   Building2,
//   User,
//   Mail,
//   Phone,
//   Globe,
//   MapPin,
//   Briefcase,
//   Pencil,
//   Trash2,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// const VendorDetails = () => {
//   const navigate = useNavigate();

//   // Dummy Data (Later replace with API)
//   const vendor = {
//     companyName: "ABC Technologies Pvt Ltd",
//     contactPerson: "John Smith",
//     email: "john@abctech.com",
//     phone: "+91 9876543210",
//     website: "https://abctech.com",
//     category: "Software Development",
//     status: "Active",
//     address:
//       "21, Anna Nagar,\nCoimbatore,\nTamil Nadu - 641001",
//     projects: [
//       {
//         id: 1,
//         name: "ERP System",
//         status: "Active",
//         budget: "₹8,00,000",
//       },
//       {
//         id: 2,
//         name: "CRM Portal",
//         status: "Completed",
//         budget: "₹5,50,000",
//       },
//     ],
//   };

//   return (
//     <div className="space-y-8">

//       {/* Header */}

//       <div className="flex items-center justify-between">

//         <div>

//           <button
//             onClick={() => navigate("/dashboard/vendors")}
//             className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-4"
//           >
//             <ArrowLeft size={18} />
//             Back to Vendors
//           </button>

//           <h1 className="text-4xl font-bold text-white">
//             Vendor Details
//           </h1>

//           <p className="text-gray-400 mt-2">
//             Complete information about this vendor.
//           </p>

//         </div>

//         <div className="flex gap-3">

//           <button
//             className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
//           >
//             <Pencil size={18} />
//             Edit
//           </button>

//           <button
//             className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
//           >
//             <Trash2 size={18} />
//             Delete
//           </button>

//         </div>

//       </div>

//       {/* Company Card */}

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

//         <h2 className="text-2xl font-bold text-white mb-8">
//           Company Information
//         </h2>

//         <div className="grid grid-cols-2 gap-8">

//           <InfoCard
//             icon={<Building2 size={22} />}
//             title="Company Name"
//             value={vendor.companyName}
//           />

//           <InfoCard
//             icon={<User size={22} />}
//             title="Contact Person"
//             value={vendor.contactPerson}
//           />

//           <InfoCard
//             icon={<Mail size={22} />}
//             title="Email"
//             value={vendor.email}
//           />

//           <InfoCard
//             icon={<Phone size={22} />}
//             title="Phone"
//             value={vendor.phone}
//           />

//           <InfoCard
//             icon={<Globe size={22} />}
//             title="Website"
//             value={vendor.website}
//           />

//           <InfoCard
//             icon={<Briefcase size={22} />}
//             title="Category"
//             value={vendor.category}
//           />

//         </div>

//         <div className="mt-8">

//           <h3 className="text-gray-400 mb-2">
//             Status
//           </h3>

//           <span className="px-4 py-2 rounded-full bg-green-600 text-white">
//             {vendor.status}
//           </span>

//         </div>

//       </div>

//       {/* Address */}

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

//         <h2 className="text-2xl font-bold text-white mb-6">
//           Address
//         </h2>

//         <div className="flex gap-4">

//           <MapPin className="text-violet-500 mt-1" />

//           <p className="text-gray-300 whitespace-pre-line">
//             {vendor.address}
//           </p>

//         </div>

//       </div>

//       {/* Projects */}

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

//         <div className="px-8 py-6 border-b border-slate-800">

//           <h2 className="text-2xl font-bold text-white">
//             Associated Projects
//           </h2>

//         </div>

//         <table className="w-full">

//           <thead className="bg-slate-800">

//             <tr>

//               <th className="text-left p-5 text-gray-300">
//                 Project
//               </th>

//               <th className="text-left p-5 text-gray-300">
//                 Budget
//               </th>

//               <th className="text-left p-5 text-gray-300">
//                 Status
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {vendor.projects.map((project) => (

//               <tr
//                 key={project.id}
//                 className="border-t border-slate-800 hover:bg-slate-800/50"
//               >

//                 <td className="p-5 text-white">
//                   {project.name}
//                 </td>

//                 <td className="p-5 text-gray-300">
//                   {project.budget}
//                 </td>

//                 <td className="p-5">

//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       project.status === "Active"
//                         ? "bg-green-600 text-white"
//                         : "bg-slate-700 text-gray-300"
//                     }`}
//                   >
//                     {project.status}
//                   </span>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// const InfoCard = ({ icon, title, value }) => (
//   <div className="bg-slate-800 rounded-2xl p-5">

//     <div className="flex items-center gap-3 text-violet-400 mb-4">
//       {icon}
//       <h3>{title}</h3>
//     </div>

//     <p className="text-lg text-white font-semibold break-all">
//       {value}
//     </p>

//   </div>
// );

// export default VendorDetails;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  BadgeCheck,
  FileText,
} from "lucide-react";

import { getVendorById } from "../../services/vendorService";

const VendorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    try {
      const data = await getVendorById(id);
      setVendor(data.vendor);
    } catch (error) {
      console.error(error);
      alert("Failed to load vendor");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading Vendor...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="text-red-500">
        Vendor not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <button
            onClick={() => navigate("/dashboard/vendors")}
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-5"
          >
            <ArrowLeft size={18} />
            Back to Vendors
          </button>

          <h1 className="text-4xl font-bold text-white">
            {vendor.companyName}
          </h1>

          <p className="text-gray-400 mt-2">
            Vendor Details
          </p>

        </div>

      </div>

      {/* Information Card */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <InfoCard
            icon={Building2}
            title="Company"
            value={vendor.companyName}
          />

          <InfoCard
            icon={BadgeCheck}
            title="Vendor Code"
            value={vendor.vendorCode}
          />

          <InfoCard
            icon={User}
            title="Contact Person"
            value={vendor.contactPerson}
          />

          <InfoCard
            icon={Mail}
            title="Email"
            value={vendor.email}
          />

          <InfoCard
            icon={Phone}
            title="Phone"
            value={vendor.phone}
          />

          <InfoCard
            icon={Phone}
            title="Alternate Phone"
            value={vendor.alternatePhone}
          />

          <InfoCard
            icon={Globe}
            title="Website"
            value={vendor.website}
          />

          <InfoCard
            icon={BadgeCheck}
            title="Service Type"
            value={vendor.serviceType}
          />

          <InfoCard
            icon={MapPin}
            title="City"
            value={vendor.city}
          />

          <InfoCard
            icon={MapPin}
            title="State"
            value={vendor.state}
          />

          <InfoCard
            icon={MapPin}
            title="Country"
            value={vendor.country}
          />

          <InfoCard
            icon={MapPin}
            title="Pincode"
            value={vendor.pincode}
          />

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-semibold text-white mb-3">
            Address
          </h2>

          <p className="text-gray-300">
            {vendor.address}
          </p>

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-semibold text-white mb-3">
            Notes
          </h2>

          <p className="text-gray-300">
            {vendor.notes || "-"}
          </p>

        </div>

      </div>

    </div>
  );
};

const InfoCard = ({
  icon: Icon,
  title,
  value,
}) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-5">

      <div className="flex items-center gap-3 mb-3">

        <Icon
          size={22}
          className="text-violet-400"
        />

        <span className="text-gray-400">
          {title}
        </span>

      </div>

      <p className="text-white text-lg font-medium">
        {value || "-"}
      </p>

    </div>
  );
};

export default VendorDetails;