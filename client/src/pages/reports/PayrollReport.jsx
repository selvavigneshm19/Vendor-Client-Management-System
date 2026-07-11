import { Search, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getPayrollReport } from "../../services/reportService";

const PayrollReport = () => {
    const [loading, setLoading] = useState(true);
    const [payrolls, setPayrolls] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            setLoading(true);

            const response = await getPayrollReport();

            setPayrolls(response.report || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPayrolls = useMemo(() => {
        const value = search.toLowerCase();

        return payrolls.filter((item) => (
            item.employee?.employeeName?.toLowerCase().includes(value) ||
            item.employee?.employeeCode?.toLowerCase().includes(value) ||
            item.month?.toLowerCase().includes(value) ||
            String(item.year).includes(value)
        ));
    }, [payrolls, search]);

    const totalPayroll = payrolls.reduce(
        (sum, item) => sum + (item.netSalary || 0),
        0
    );

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Payroll Report
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Employee payroll summary.
                    </p>

                </div>

                <div className="bg-orange-600 px-5 py-3 rounded-xl flex items-center gap-3">

                    <Wallet size={22} />

                    <div>

                        <p className="text-xs text-orange-100">
                            Total Payroll
                        </p>

                        <h2 className="text-xl font-bold">
                            ₹{totalPayroll.toLocaleString()}
                        </h2>

                    </div>

                </div>

            </div>

            {/* Search */}

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search payroll..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white outline-none"
                />

            </div>

            {/* Table */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-800">

                        <tr>

                            <th className="text-left p-4">
                                Employee
                            </th>

                            <th className="text-left p-4">
                                Code
                            </th>

                            <th className="text-left p-4">
                                Month
                            </th>

                            <th className="text-left p-4">
                                Year
                            </th>

                            <th className="text-left p-4">
                                Basic
                            </th>

                            <th className="text-left p-4">
                                Allowances
                            </th>

                            <th className="text-left p-4">
                                Deductions
                            </th>

                            <th className="text-left p-4">
                                Bonus
                            </th>

                            <th className="text-left p-4">
                                Net Salary
                            </th>

                            <th className="text-left p-4">
                                Status
                            </th>

                            <th className="text-left p-4">
                                Payment Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="11"
                                    className="text-center p-8 text-gray-400"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : filteredPayrolls.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="11"
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Payroll Records Found
                                </td>

                            </tr>

                        ) : (

                            filteredPayrolls.map((item) => (

                                <tr
                                    key={item._id}
                                    className="border-t border-slate-800 hover:bg-slate-800/40"
                                >

                                    <td className="p-4 text-white">
                                        {item.employee?.employeeName}
                                    </td>

                                    <td className="p-4">
                                        {item.employee?.employeeCode}
                                    </td>

                                    <td className="p-4">
                                        {item.month}
                                    </td>

                                    <td className="p-4">
                                        {item.year}
                                    </td>

                                    <td className="p-4">
                                        ₹{item.basicSalary?.toLocaleString()}
                                    </td>

                                    <td className="p-4 text-green-400">
                                        ₹{item.allowances?.toLocaleString()}
                                    </td>

                                    <td className="p-4 text-red-400">
                                        ₹{item.deductions?.toLocaleString()}
                                    </td>

                                    <td className="p-4 text-yellow-400">
                                        ₹{item.bonus?.toLocaleString()}
                                    </td>

                                    <td className="p-4 font-semibold text-white">
                                        ₹{item.netSalary?.toLocaleString()}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${item.paymentStatus === "Paid"
                                                    ? "bg-green-600 text-white"
                                                    : item.paymentStatus === "Pending"
                                                        ? "bg-yellow-500 text-black"
                                                        : "bg-blue-600 text-white"
                                                }`}
                                        >
                                            {item.paymentStatus}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {item.paymentDate
                                            ? new Date(
                                                item.paymentDate
                                            ).toLocaleDateString()
                                            : "-"}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default PayrollReport;