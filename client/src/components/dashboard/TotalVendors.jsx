import { Building2 } from "lucide-react";

const TotalVendors = ({
  title = "Total Vendors",
  value = 125,
}) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-400">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {value}
          </h2>

        </div>

        <div className="h-14 w-14 rounded-xl bg-violet-600 flex items-center justify-center">

          <Building2 size={26} className="text-white"/>

        </div>

      </div>

    </div>
  );
};

export default TotalVendors;