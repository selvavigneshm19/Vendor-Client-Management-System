const TaskFilters = ({
    statusFilter,
    setStatusFilter,
}) => {
    return (
        <div className="flex flex-wrap gap-4">

            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value)
                }
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
            >
                <option value="All">
                    All Status
                </option>

                <option value="Pending">
                    Pending
                </option>

                <option value="In Progress">
                    In Progress
                </option>

                <option value="Completed">
                    Completed
                </option>

                <option value="On Hold">
                    On Hold
                </option>

            </select>

        </div>
    );
};

export default TaskFilters;