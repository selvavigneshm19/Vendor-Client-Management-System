import { Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getEmployeeReport } from "../../services/reportService";

const EmployeeReport = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const response = await getEmployeeReport();

            setEmployees(response.report || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEmployees = useMemo(() => {
        return employees.filter((emp) => {
            const value = search.toLowerCase();

            return (
                emp.employeeName?.toLowerCase().includes(value) ||
                emp.employeeCode?.toLowerCase().includes(value) ||
                emp.department?.toLowerCase().includes(value) ||
                emp.designation?.toLowerCase().includes(value)
            );
        });
    }, [employees, search]);

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Employee Report
                    </h1>

                    <p className="text-gray-400 mt-1">
                        View all employee records.
                    </p>

                </div>

                <div className="bg-blue-600 px-5 py-3 rounded-xl flex items-center gap-3">

                    <Users size={22} />

                    <div>

                        <p className="text-xs text-blue-100">
                            Total Employees
                        </p>

                        <h2 className="text-xl font-bold">
                            {employees.length}
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
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
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
                                Department
                            </th>

                            <th className="text-left p-4">
                                Designation
                            </th>

                            <th className="text-left p-4">
                                Project
                            </th>

                            <th className="text-left p-4">
                                Created By
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center p-8 text-gray-400"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : filteredEmployees.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Employees Found
                                </td>

                            </tr>

                        ) : (

                            filteredEmployees.map((employee) => (

                                <tr
                                    key={employee._id}
                                    className="border-t border-slate-800 hover:bg-slate-800/40"
                                >

                                    <td className="p-4 text-white">
                                        {employee.employeeName}
                                    </td>

                                    <td className="p-4">
                                        {employee.employeeCode}
                                    </td>

                                    <td className="p-4">
                                        {employee.department}
                                    </td>

                                    <td className="p-4">
                                        {employee.designation}
                                    </td>

                                    <td className="p-4">
                                        {employee.project?.projectName || "-"}
                                    </td>

                                    <td className="p-4">
                                        {employee.createdBy?.name || "-"}
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

export default EmployeeReport;