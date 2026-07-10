import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DeleteVendorModal from "./DeleteVendorModal";
import { deleteVendor } from "../../services/vendorService";

const VendorTable = ({ vendors, loading }) => {
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Delete Vendor
  const handleDelete = async () => {
    if (!selectedVendor) return;

    try {
      setDeleteLoading(true);

      await deleteVendor(selectedVendor._id);

      alert("Vendor deleted successfully");

      setOpenDelete(false);
      setSelectedVendor(null);

      // Refresh vendor list
      window.location.reload();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete vendor"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
        Loading vendors...
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4 text-gray-300">
                Company
              </th>

              <th className="text-left p-4 text-gray-300">
                Contact
              </th>

              <th className="text-left p-4 text-gray-300">
                Email
              </th>

              <th className="text-left p-4 text-gray-300">
                Phone
              </th>

              <th className="text-left p-4 text-gray-300">
                Status
              </th>

              <th className="text-center p-4 text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {vendors.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8 text-gray-400"
                >
                  No vendors found
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <tr
                  key={vendor._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 text-white">
                    {vendor.companyName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {vendor.contactPerson}
                  </td>

                  <td className="p-4 text-gray-300">
                    {vendor.email}
                  </td>

                  <td className="p-4 text-gray-300">
                    {vendor.phone}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vendor.status === "Active"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>

                  <td className="p-4">

                    <div className="flex items-center justify-center gap-3">

                      {/* View */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/vendors/${vendor._id}`)
                        }
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/vendors/edit/${vendor._id}`)
                        }
                        className="p-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setOpenDelete(true);
                        }}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Delete Confirmation Modal */}

      <DeleteVendorModal
        open={openDelete}
        loading={deleteLoading}
        onClose={() => {
          setOpenDelete(false);
          setSelectedVendor(null);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default VendorTable;