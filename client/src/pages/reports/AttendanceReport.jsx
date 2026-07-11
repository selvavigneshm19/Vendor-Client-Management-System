import { CalendarCheck, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getAttendanceReport } from "../../services/reportService";

const AttendanceReport = () => {

    const [loading, setLoading] = useState(true);

    const [attendance, setAttendance] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {

        try {

            setLoading(true);

            const response = await getAttendanceReport();

            setAttendance(response.report || []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const filteredAttendance = useMemo(() => {

        return attendance.filter((item) => {

            const value = search.toLowerCase();

            return (

                item.employee?.employeeName?.toLowerCase().includes(value) ||

                item.employee?.employeeCode?.toLowerCase().includes(value) ||

                item.employee?.department?.toLowerCase().includes(value) ||

                item.status?.toLowerCase().includes(value)

            );

        });

    }, [attendance, search]);

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Attendance Report
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Employee attendance overview.
                    </p>

                </div>

                <div className="bg-green-600 px-5 py-3 rounded-xl flex items-center gap-3">

                    <CalendarCheck size={22} />

                    <div>

                        <p className="text-xs text-green-100">
                            Total Records
                        </p>

                        <h2 className="text-xl font-bold">
                            {attendance.length}
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
                    placeholder="Search attendance..."
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
                                Department
                            </th>

                            <th className="text-left p-4">
                                Attendance Date
                            </th>

                            <th className="text-left p-4">
                                Check In
                            </th>

                            <th className="text-left p-4">
                                Check Out
                            </th>

                            <th className="text-left p-4">
                                Working Hours
                            </th>

                            <th className="text-left p-4">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center p-8 text-gray-400"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : filteredAttendance.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Attendance Records Found
                                </td>

                            </tr>

                        ) : (

                            filteredAttendance.map((item) => (

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
                                        {item.employee?.department}
                                    </td>

                                    <td className="p-4">
                                        {new Date(item.attendanceDate).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">
                                        {item.checkInTime
                                            ? new Date(item.checkInTime).toLocaleTimeString()
                                            : "-"}
                                    </td>

                                    <td className="p-4">
                                        {item.checkOutTime
                                            ? new Date(item.checkOutTime).toLocaleTimeString()
                                            : "-"}
                                    </td>

                                    <td className="p-4">
                                        {item.workingHours || 0} hrs
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${item.status === "Present"
                                                    ? "bg-green-600 text-white"
                                                    : item.status === "Absent"
                                                        ? "bg-red-600 text-white"
                                                        : item.status === "Half Day"
                                                            ? "bg-yellow-500 text-black"
                                                            : "bg-blue-600 text-white"
                                                }`}
                                        >
                                            {item.status}
                                        </span>

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

export default AttendanceReport;