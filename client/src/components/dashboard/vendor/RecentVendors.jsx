import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const vendors = [
  {
    id: 1,
    name: "John David",
    company: "ABC Pvt Ltd",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul",
    company: "XYZ Solutions",
    status: "Active",
  },
  {
    id: 3,
    name: "Priya",
    company: "NextGen",
    status: "Pending",
  },
  {
    id: 4,
    name: "Arun",
    company: "TechSoft",
    status: "Inactive",
  },
];

const badge = {
  Active: "bg-green-500/20 text-green-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Inactive: "bg-red-500/20 text-red-400",
};

const RecentVendors = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold text-white">
          Recent Vendors
        </h2>

        <Link
          to="/dashboard/vendors"
          className="text-violet-400 flex items-center gap-1 text-sm hover:text-violet-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>

      </div>

      <div className="space-y-4">

        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex items-center justify-between border-b border-slate-800 pb-3"
          >

            <div className="flex items-center gap-3">

              <div className="h-11 w-11 rounded-xl bg-violet-600 flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>

              <div>

                <h3 className="text-white font-medium">
                  {vendor.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {vendor.company}
                </p>

              </div>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs ${badge[vendor.status]}`}
            >
              {vendor.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentVendors;