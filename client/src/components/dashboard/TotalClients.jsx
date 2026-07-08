import { Users } from "lucide-react";

const TotalClients = ({
  title = "Total Clients",
  value = 340,
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

        <div className="h-14 w-14 rounded-xl bg-cyan-600 flex items-center justify-center">

          <Users size={26} className="text-white"/>

        </div>

      </div>

    </div>
  );
};

export default TotalClients;