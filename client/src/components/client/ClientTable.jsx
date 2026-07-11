import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DeleteClientModal from "./DeleteClientModal";
import { deleteClient } from "../../services/clientService";

const ClientTable = ({ clients, loading }) => {
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
        Loading clients...
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4 text-gray-300">Company</th>

              <th className="text-left p-4 text-gray-300">Vendor</th>

              <th className="text-left p-4 text-gray-300">Contact</th>

              <th className="text-left p-4 text-gray-300">Email</th>

              <th className="text-left p-4 text-gray-300">Phone</th>

              <th className="text-left p-4 text-gray-300">Status</th>

              <th className="text-center p-4 text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-8 text-gray-400"
                >
                  No clients found
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr
                  key={client._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="p-4 text-white">
                    {client.companyName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {client.vendor?.companyName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {client.contactPerson}
                  </td>

                  <td className="p-4 text-gray-300">
                    {client.email}
                  </td>

                  <td className="p-4 text-gray-300">
                    {client.phone}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        client.status === "Active"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">

                      {/* View */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/clients/${client._id}`)
                        }
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/clients/edit/${client._id}`
                          )
                        }
                        className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setOpenDelete(true);
                        }}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
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

      <DeleteClientModal
        open={openDelete}
        loading={deleteLoading}
        onClose={() => {
          setOpenDelete(false);
          setSelectedClient(null);
        }}
        onDelete={async () => {
          try {
            setDeleteLoading(true);

            await deleteClient(selectedClient._id);

            alert("Client deleted successfully");

            window.location.reload();
          } catch (error) {
            alert(
              error.response?.data?.message ||
                "Failed to delete client"
            );
          } finally {
            setDeleteLoading(false);
            setOpenDelete(false);
            setSelectedClient(null);
          }
        }}
      />
    </>
  );
};

export default ClientTable;