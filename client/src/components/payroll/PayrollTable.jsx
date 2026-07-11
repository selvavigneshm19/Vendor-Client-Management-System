import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    deletePayroll,
} from "../../services/payrollService";

import DeletePayrollModal from "./DeletePayrollModal";

const PayrollTable = ({
    payrolls,
    loading,
}) => {
    const navigate = useNavigate();

    const [openDelete, setOpenDelete] = useState(false);
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);

            await deletePayroll(selectedPayroll._id);

            alert("Payroll deleted successfully");

            setOpenDelete(false);

            window.location.reload();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete payroll"
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                Loading Payroll...
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
                                Month
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Year
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Basic Salary
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Net Salary
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

                        {payrolls.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Payroll Records Found
                                </td>
                            </tr>
                        ) : (
                            payrolls.map((payroll) => (
                                <tr
                                    key={payroll._id}
                                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                                >

                                    <td className="p-4 text-white">
                                        {payroll.employee?.employeeName}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {payroll.month}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {payroll.year}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        ₹ {payroll.basicSalary}
                                    </td>

                                    <td className="p-4 text-gray-300 font-semibold">
                                        ₹ {payroll.netSalary}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${payroll.paymentStatus === "Paid"
                                                    ? "bg-green-600 text-white"
                                                    : payroll.paymentStatus === "Pending"
                                                        ? "bg-yellow-500 text-black"
                                                        : "bg-blue-600 text-white"
                                                }`}
                                        >
                                            {payroll.paymentStatus}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/payroll/${payroll._id}`
                                                    )
                                                }
                                                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/payroll/edit/${payroll._id}`
                                                    )
                                                }
                                                className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedPayroll(payroll);
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

            <DeletePayrollModal
                open={openDelete}
                payroll={selectedPayroll}
                loading={deleteLoading}
                onClose={() => {
                    setOpenDelete(false);
                    setSelectedPayroll(null);
                }}
                onDelete={handleDelete}
            />
        </>
    );
};

export default PayrollTable;