const VendorFilters = ({
  statusFilter,
  setStatusFilter,
  serviceFilter,
  setServiceFilter,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Status Filter */}
        <div>
          <label className="block text-gray-400 mb-2 text-sm">
            Status
          </label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Service Type Filter */}
        <div>
          <label className="block text-gray-400 mb-2 text-sm">
            Service Type
          </label>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="All">All Services</option>

            <option value="Software Development">
              Software Development
            </option>

            <option value="IT Services">
              IT Services
            </option>

            <option value="Consulting">
              Consulting
            </option>

            <option value="Manufacturing">
              Manufacturing
            </option>

            <option value="Logistics">
              Logistics
            </option>

            <option value="Construction">
              Construction
            </option>

            <option value="HR Services">
              HR Services
            </option>

            <option value="Finance">
              Finance
            </option>

            <option value="Marketing">
              Marketing
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

      </div>

    </div>
  );
};

export default VendorFilters;