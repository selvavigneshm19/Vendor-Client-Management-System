const AttendanceFilters = ({
    statusFilter,
    setStatusFilter,
}) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>

                    <label className="block text-gray-300 mb-2">
                        Status
                    </label>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="w-full bg-slate-800 rounded-xl p-3 text-white"
                    >
                        <option value="All">All Status</option>
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Half Day</option>
                        <option>Leave</option>
                        <option>Work From Home</option>
                    </select>

                </div>

            </div>

        </div>
    );
};

export default AttendanceFilters;