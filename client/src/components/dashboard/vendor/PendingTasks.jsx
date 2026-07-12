import {
  CheckSquare,
  Clock,
} from "lucide-react";

const tasks = [
  "Verify Vendor Documents",
  "Client Meeting at 3 PM",
  "Generate Payroll",
  "Update Project Status",
];

const PendingTasks = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center gap-2 mb-5">

        <Clock className="text-orange-400" />

        <h2 className="text-xl font-semibold text-white">
          Pending Tasks
        </h2>

      </div>

      <div className="space-y-4">

        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >

            <CheckSquare className="text-violet-500" size={18} />

            <p className="text-gray-300">
              {task}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default PendingTasks;