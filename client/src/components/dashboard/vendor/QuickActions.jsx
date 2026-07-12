import {
  PlusCircle,
  UserPlus,
  FolderPlus,
  Building2,
  ClipboardList,
  BarChart3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Building2,
      label: "Vendor",
      path: "/dashboard/vendors/add",
    },
    {
      icon: UserPlus,
      label: "Client",
      path: "/dashboard/clients/add",
    },
    {
      icon: FolderPlus,
      label: "Project",
      path: "/dashboard/projects/add",
    },
    {
      icon: ClipboardList,
      label: "Task",
      path: "/dashboard/tasks/add",
    },
    {
      icon: BarChart3,
      label: "Reports",
      path: "/dashboard/reports",
    },
    {
      icon: PlusCircle,
      label: "Employee",
      path: "/dashboard/employees/add",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="bg-slate-800 hover:bg-violet-600 transition rounded-xl p-5 flex flex-col items-center gap-3"
          >

            <action.icon
              className="text-white"
              size={28}
            />

            <span className="text-white text-sm">
              {action.label}
            </span>

          </button>
        ))}

      </div>

    </div>
  );
};

export default QuickActions;