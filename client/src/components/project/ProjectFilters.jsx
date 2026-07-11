const ProjectFilters = ({
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
        <option value="Planning">Planning</option>
        <option value="In Progress">
          In Progress
        </option>
        <option value="On Hold">On Hold</option>
        <option value="Completed">
          Completed
        </option>
        <option value="Cancelled">
          Cancelled
        </option>
      </select>

    </div>
  );
};

export default ProjectFilters;