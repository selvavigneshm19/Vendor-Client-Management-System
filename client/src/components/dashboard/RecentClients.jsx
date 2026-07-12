import { ArrowRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Infosys",
    vendor: "John",
    project: "ERP",
  },
  {
    id: 2,
    name: "TCS",
    vendor: "Rahul",
    project: "HRMS",
  },
  {
    id: 3,
    name: "Zoho",
    vendor: "Priya",
    project: "CRM",
  },
  {
    id: 4,
    name: "HCL",
    vendor: "Arun",
    project: "Payroll",
  },
];

const RecentClients = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold text-white">
          Recent Clients
        </h2>

        <Link
          to="/dashboard/clients"
          className="text-violet-400 flex items-center gap-1 text-sm hover:text-violet-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>

      </div>

      <div className="space-y-4">

        {clients.map((client) => (
          <div
            key={client.id}
            className="flex justify-between border-b border-slate-800 pb-3"
          >

            <div className="flex gap-3">

              <div className="h-11 w-11 rounded-xl bg-cyan-600 flex items-center justify-center">
                <UserRound className="text-white" size={20} />
              </div>

              <div>

                <h3 className="text-white font-medium">
                  {client.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  Vendor : {client.vendor}
                </p>

              </div>

            </div>

            <span className="text-violet-400 text-sm">
              {client.project}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentClients;