const ClientFilters = ({
  statusFilter,
  setStatusFilter,
  industryFilter,
  setIndustryFilter,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block text-gray-400 mb-2 text-sm">
            Status
          </label>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm">
            Industry
          </label>

          <select
            value={industryFilter}
            onChange={(e) =>
              setIndustryFilter(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
          >
            <option value="All">All Industries</option>
            <option value="IT">IT</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Construction">Construction</option>
            <option value="Other">Other</option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default ClientFilters;