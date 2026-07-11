import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteLeave } from "../../services/leaveService";
import DeleteLeaveModal from "./DeleteLeaveModal";

const LeaveTable = ({
    leaves,
    loading,
}) => {
    const navigate = useNavigate();

    const [openDelete, setOpenDelete] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                Loading Leaves...
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
                                Leave Type
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                From
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                To
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Days
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

                        {leaves.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Leave Records Found
                                </td>
                            </tr>
                        ) : (
                            leaves.map((leave) => (
                                <tr
                                    key={leave._id}
                                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                                >

                                    <td className="p-4 text-white">
                                        {leave.employee?.employeeName}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {leave.leaveType}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {new Date(
                                            leave.fromDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {new Date(
                                            leave.toDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {leave.totalDays}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${leave.status === "Approved"
                                                    ? "bg-green-600 text-white"
                                                    : leave.status === "Rejected"
                                                        ? "bg-red-600 text-white"
                                                        : "bg-yellow-500 text-black"
                                                }`}
                                        >
                                            {leave.status}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-3">

                                            {/* View */}

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/leaves/${leave._id}`
                                                    )
                                                }
                                                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Edit */}

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/leaves/edit/${leave._id}`
                                                    )
                                                }
                                                className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            {/* Delete */}

                                            <button
                                                onClick={() => {
                                                    setSelectedLeave(leave);
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

            <DeleteLeaveModal
                open={openDelete}
                loading={deleteLoading}
                onClose={() => {
                    setOpenDelete(false);
                    setSelectedLeave(null);
                }}
                onDelete={async () => {
                    try {
                        setDeleteLoading(true);

                        await deleteLeave(selectedLeave._id);

                        alert("Leave deleted successfully");

                        window.location.reload();

                    } catch (error) {
                        console.error(error);

                        alert(
                            error.response?.data?.message ||
                            "Failed to delete leave"
                        );
                    } finally {
                        setDeleteLoading(false);
                        setOpenDelete(false);
                        setSelectedLeave(null);
                    }
                }}
            />
        </>
    );
};

export default LeaveTable;