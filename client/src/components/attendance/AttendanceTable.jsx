import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteAttendance } from "../../services/attendanceService";
import DeleteAttendanceModal from "./DeleteAttendanceModal";

const AttendanceTable = ({
    attendance,
    loading,
}) => {
    const navigate = useNavigate();

    const [openDelete, setOpenDelete] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                Loading Attendance...
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
                                Date
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Check In
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Check Out
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Hours
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

                        {attendance.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Attendance Records Found
                                </td>
                            </tr>
                        ) : (
                            attendance.map((record) => (
                                <tr
                                    key={record._id}
                                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                                >

                                    <td className="p-4 text-white">
                                        {record.employee?.employeeName}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {new Date(
                                            record.attendanceDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {record.checkIn || "-"}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {record.checkOut || "-"}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {record.workingHours}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${record.status === "Present"
                                                    ? "bg-green-600 text-white"
                                                    : record.status === "Absent"
                                                        ? "bg-red-600 text-white"
                                                        : record.status === "Half Day"
                                                            ? "bg-yellow-500 text-black"
                                                            : record.status === "Leave"
                                                                ? "bg-orange-500 text-white"
                                                                : "bg-blue-600 text-white"
                                                }`}
                                        >
                                            {record.status}
                                        </span>
                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-3">

                                            {/* View */}

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/attendance/${record._id}`
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
                                                        `/dashboard/attendance/edit/${record._id}`
                                                    )
                                                }
                                                className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            {/* Delete */}

                                            <button
                                                onClick={() => {
                                                    setSelectedAttendance(record);
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

            {/* Delete Modal */}

            <DeleteAttendanceModal
                open={openDelete}
                loading={deleteLoading}
                onClose={() => {
                    setOpenDelete(false);
                    setSelectedAttendance(null);
                }}
                onDelete={async () => {
                    try {
                        setDeleteLoading(true);

                        await deleteAttendance(
                            selectedAttendance._id
                        );

                        alert("Attendance deleted successfully");

                        window.location.reload();

                    } catch (error) {
                        console.error(error);

                        alert(
                            error.response?.data?.message ||
                            "Failed to delete attendance"
                        );
                    } finally {
                        setDeleteLoading(false);
                        setOpenDelete(false);
                        setSelectedAttendance(null);
                    }
                }}
            />
        </>
    );
};

export default AttendanceTable;