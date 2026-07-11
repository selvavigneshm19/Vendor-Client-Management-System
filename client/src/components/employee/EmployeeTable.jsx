import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { deleteEmployee } from "../../services/employeeService";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const EmployeeTable = ({
  employees,
  loading,
}) => {
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
        Loading Employees...
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
                Employee
              </th>

              <th className="text-left p-4 text-gray-300">
                Code
              </th>

              <th className="text-left p-4 text-gray-300">
                Project
              </th>

              <th className="text-left p-4 text-gray-300">
                Designation
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

            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-8 text-gray-400"
                >
                  No Employees Found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 text-white">
                    {employee.employeeName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {employee.employeeCode}
                  </td>

                  <td className="p-4 text-gray-300">
                    {employee.project?.projectName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {employee.designation}
                  </td>

                  <td className="p-4 text-gray-300">
                    {employee.phone}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === "Active"
                          ? "bg-green-600 text-white"
                          : employee.status === "On Leave"
                          ? "bg-yellow-500 text-black"
                          : employee.status === "Inactive"
                          ? "bg-red-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      {/* View */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/employees/${employee._id}`)
                        }
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/employees/edit/${employee._id}`)
                        }
                        className="p-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setOpenDelete(true);
                        }}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
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

      <DeleteEmployeeModal
        open={openDelete}
        loading={deleteLoading}
        onClose={() => {
          setOpenDelete(false);
          setSelectedEmployee(null);
        }}
        onDelete={async () => {
          try {
            setDeleteLoading(true);

            await deleteEmployee(selectedEmployee._id);

            alert("Employee deleted successfully");

            window.location.reload();

          } catch (error) {
            console.error(error);

            alert(
              error.response?.data?.message ||
                "Failed to delete employee"
            );
          } finally {
            setDeleteLoading(false);
            setOpenDelete(false);
            setSelectedEmployee(null);
          }
        }}
      />
    </>
  );
};

export default EmployeeTable;