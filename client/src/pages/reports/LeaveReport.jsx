import { CalendarDays } from "lucide-react";

const LeaveReport = () => {
    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Leave Report
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Employee Leave Report
                    </p>

                </div>

                <div className="bg-yellow-600 px-5 py-3 rounded-xl flex items-center gap-3">

                    <CalendarDays size={22} />

                    <div>

                        <p className="text-xs text-yellow-100">
                            Leave Records
                        </p>

                        <h2 className="text-xl font-bold">
                            Coming Soon
                        </h2>

                    </div>

                </div>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">

                <CalendarDays
                    size={70}
                    className="mx-auto text-yellow-500"
                />

                <h2 className="text-2xl font-semibold text-white mt-6">
                    Leave Report
                </h2>

                <p className="text-gray-400 mt-3">
                    Backend API is not available.
                </p>

                <p className="text-gray-500 mt-2">
                    Add
                    <span className="text-green-400">
                        {" "}GET /api/reports/leaves{" "}
                    </span>
                    to enable this report.
                </p>

            </div>

        </div>
    );
};

export default LeaveReport;