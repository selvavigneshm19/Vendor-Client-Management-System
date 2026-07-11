const EmployeeFilters = ({
    statusFilter,
    setStatusFilter,
}) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

            <label className="block text-gray-400 mb-2 text-sm">
                Status
            </label>

            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value)
                }
                className="w-full md:w-72 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
                <option value="Resigned">Resigned</option>
            </select>

        </div>
    );
};

export default EmployeeFilters;