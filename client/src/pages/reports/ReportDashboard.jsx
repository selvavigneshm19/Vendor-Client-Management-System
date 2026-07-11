// import ReportCards from "../../components/report/ReportCards";


// const ReportDashboard = () => {
//     const cards = [
//         {
//             title: "Employees",
//             value: 10,
//             subtitle: "Registered",
//             icon: "Users",
//             color: "bg-blue-600",
//         },
//     ];

//     return (
//         <div className="p-6">
//             <ReportCards cards={cards} />
//         </div>
//     );
// };

// export default ReportDashboard;


import {
    ArrowRight,
    BarChart3,
    CalendarCheck,
    CalendarDays,
    CheckSquare,
    FileText,
    FolderKanban,
    RefreshCw,
    Users,
    Wallet,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getDashboardReport,
} from "../../services/reportService";

import ExportButtons from "../../components/report/ExportButtons";
import ReportCards from "../../components/report/ReportCards";
import ReportCharts from "../../components/report/ReportCharts";

const ReportDashboard = () => {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        totalEmployees: 0,

        totalProjects: 0,

        totalAttendance: 0,

        totalLeaves: 0,

        totalTasks: 0,

        totalPayroll: 0,

    });

    const fetchDashboard = async () => {

        try {

            setLoading(true);

            const response = await getDashboardReport();

            setDashboard(response.report);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Summary Cards
    |--------------------------------------------------------------------------
    */

    const cards = [

        {

            title: "Employees",

            value: dashboard.totalEmployees,

            subtitle: "Registered Employees",

            icon: Users,

            color: "bg-blue-600",

        },

        {

            title: "Projects",

            value: dashboard.totalProjects,

            subtitle: "Running Projects",

            icon: FolderKanban,

            color: "bg-violet-600",

        },

        {

            title: "Attendance",

            value: dashboard.totalAttendance,

            subtitle: "Attendance Records",

            icon: CalendarCheck,

            color: "bg-green-600",

        },

        {

            title: "Leaves",

            value: dashboard.totalLeaves,

            subtitle: "Leave Requests",

            icon: CalendarDays,

            color: "bg-yellow-500",

        },

        {

            title: "Tasks",

            value: dashboard.totalTasks,

            subtitle: "Assigned Tasks",

            icon: CheckSquare,

            color: "bg-pink-600",

        },

        {

            title: "Payroll",

            value: `₹${dashboard.totalPayroll.toLocaleString()}`,

            subtitle: "Total Payroll",

            icon: Wallet,

            color: "bg-orange-600",

        },

    ];

    /*
    |--------------------------------------------------------------------------
    | Attendance Chart
    |--------------------------------------------------------------------------
    */

    const attendanceChart = [

        {

            name: "Attendance",

            value: dashboard.totalAttendance,

        },

        {

            name: "Leaves",

            value: dashboard.totalLeaves,

        },

    ];

    /*
    |--------------------------------------------------------------------------
    | Project Chart
    |--------------------------------------------------------------------------
    */

    const projectChart = [

        {

            name: "Projects",

            value: dashboard.totalProjects,

        },

        {

            name: "Tasks",

            value: dashboard.totalTasks,

        },

        {

            name: "Employees",

            value: dashboard.totalEmployees,

        },

    ];
    return (

        <div className="space-y-8">

            {/* ================= Header ================= */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center">

                            <BarChart3
                                size={30}
                                className="text-white"
                            />

                        </div>

                        <div>

                            <h1 className="text-4xl font-bold text-white">

                                Reports Dashboard

                            </h1>

                            <p className="text-gray-400 mt-1">

                                Analytics & Business Intelligence

                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        onClick={fetchDashboard}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl transition"
                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                    <ExportButtons
                        onExportPDF={() =>
                            console.log("Export PDF")
                        }
                        onExportExcel={() =>
                            console.log("Export Excel")
                        }
                        onPrint={() =>
                            window.print()
                        }
                    />

                </div>

            </div>

            {/* ================= Summary Cards ================= */}

            <ReportCards cards={cards} />

            {/* ================= Charts ================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <ReportCharts
                    title="Attendance vs Leave"
                    type="pie"
                    data={attendanceChart}
                />

                <ReportCharts
                    title="Project Overview"
                    type="bar"
                    data={projectChart}
                />

            </div>

            {/* ================= Quick Reports ================= */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <div className="flex items-center gap-3 mb-6">

                    <FileText
                        size={28}
                        className="text-violet-500"
                    />

                    <div>

                        <h2 className="text-2xl font-semibold text-white">

                            Quick Reports

                        </h2>

                        <p className="text-gray-400">

                            Navigate to detailed reports.

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    <Link
                        to="/dashboard/reports/employees"
                        className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <Users
                                    className="text-blue-500 mb-3"
                                    size={30}
                                />

                                <h3 className="text-white font-semibold">

                                    Employee Report

                                </h3>

                                <p className="text-sm text-gray-400 mt-1">

                                    View all employees

                                </p>

                            </div>

                            <ArrowRight
                                className="text-gray-400"
                                size={20}
                            />

                        </div>

                    </Link>

                    <Link
                        to="/dashboard/reports/attendance"
                        className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <CalendarCheck
                                    className="text-green-500 mb-3"
                                    size={30}
                                />

                                <h3 className="text-white font-semibold">

                                    Attendance Report

                                </h3>

                                <p className="text-sm text-gray-400 mt-1">

                                    Attendance history

                                </p>

                            </div>

                            <ArrowRight
                                className="text-gray-400"
                                size={20}
                            />

                        </div>

                    </Link>

                    <Link
                        to="/dashboard/reports/leaves"
                        className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <CalendarDays
                                    className="text-yellow-500 mb-3"
                                    size={30}
                                />

                                <h3 className="text-white font-semibold">

                                    Leave Report

                                </h3>

                                <p className="text-sm text-gray-400 mt-1">

                                    Leave analytics

                                </p>

                            </div>

                            <ArrowRight
                                className="text-gray-400"
                                size={20}
                            />

                        </div>

                    </Link>

                    <Link
                        to="/dashboard/reports/payroll"
                        className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <Wallet
                                    className="text-orange-500 mb-3"
                                    size={30}
                                />

                                <h3 className="text-white font-semibold">

                                    Payroll Report

                                </h3>

                                <p className="text-sm text-gray-400 mt-1">

                                    Salary reports

                                </p>

                            </div>

                            <ArrowRight
                                className="text-gray-400"
                                size={20}
                            />

                        </div>

                    </Link>

                    <Link
                        to="/dashboard/reports/tasks"
                        className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <CheckSquare
                                    className="text-pink-500 mb-3"
                                    size={30}
                                />

                                <h3 className="text-white font-semibold">

                                    Task Report

                                </h3>

                                <p className="text-sm text-gray-400 mt-1">

                                    Task analytics

                                </p>

                            </div>

                            <ArrowRight
                                className="text-gray-400"
                                size={20}
                            />

                        </div>

                    </Link>

                    <Link
                        to="/dashboard/projects"
                        className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <FolderKanban
                                    className="text-violet-500 mb-3"
                                    size={30}
                                />

                                <h3 className="text-white font-semibold">

                                    Project Report

                                </h3>

                                <p className="text-sm text-gray-400 mt-1">

                                    Project analytics

                                </p>

                            </div>

                            <ArrowRight
                                className="text-gray-400"
                                size={20}
                            />

                        </div>

                    </Link>

                </div>

            </div>
            {/* ================= Loading ================= */}

            {loading && (

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

                    <RefreshCw
                        size={40}
                        className="mx-auto animate-spin text-violet-500"
                    />

                    <p className="mt-4 text-gray-400">
                        Loading Dashboard...
                    </p>

                </div>

            )}

            {/* ================= Dashboard Summary ================= */}

            {!loading && (

                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8">

                    <h2 className="text-2xl font-bold text-white">

                        Dashboard Summary

                    </h2>

                    <p className="text-violet-100 mt-2">

                        Your organization currently has

                        <span className="font-bold">
                            {" "} {dashboard.totalEmployees} Employees
                        </span>

                        working on

                        <span className="font-bold">
                            {" "} {dashboard.totalProjects} Projects
                        </span>

                        with

                        <span className="font-bold">
                            {" "} {dashboard.totalTasks} Tasks
                        </span>

                        and

                        <span className="font-bold">
                            {" "} {dashboard.totalAttendance} Attendance Records.
                        </span>

                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

                        <div>

                            <p className="text-violet-200 text-sm">
                                Employees
                            </p>

                            <h3 className="text-3xl font-bold text-white">
                                {dashboard.totalEmployees}
                            </h3>

                        </div>

                        <div>

                            <p className="text-violet-200 text-sm">
                                Projects
                            </p>

                            <h3 className="text-3xl font-bold text-white">
                                {dashboard.totalProjects}
                            </h3>

                        </div>

                        <div>

                            <p className="text-violet-200 text-sm">
                                Tasks
                            </p>

                            <h3 className="text-3xl font-bold text-white">
                                {dashboard.totalTasks}
                            </h3>

                        </div>

                        <div>

                            <p className="text-violet-200 text-sm">
                                Payroll
                            </p>

                            <h3 className="text-3xl font-bold text-white">

                                ₹{dashboard.totalPayroll.toLocaleString()}

                            </h3>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default ReportDashboard;