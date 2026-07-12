import {
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  CalendarDays,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 h-screen flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-violet-500">
          VCMS
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Vendor Client Management
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

        {/* Dashboard */}
        <SidebarItem
          icon={LayoutDashboard}
          title="Dashboard"
          to="/dashboard"
        />

        {/* Super Admin */}
        {/* {role === "superadmin" && (
          <SidebarItem
            icon={Shield}
            title="Admins"
            to="/dashboard/admins"
          />
        )} */}

        {/* Super Admin + Admin */}
        {(role === "superadmin" || role === "admin") && (
          <>
            <SidebarItem
              icon={Building2}
              title="Vendors"
              to="/dashboard/vendors"
            />

            <SidebarItem
              icon={Wallet}
              title="Payroll"
              to="/dashboard/payroll"
            />
          </>
        )}

        {/* Everyone */}
        <SidebarItem
          icon={Users}
          title="Clients"
          to="/dashboard/clients"
        />

        <SidebarItem
          icon={FolderKanban}
          title="Projects"
          to="/dashboard/projects"
        />

        <SidebarItem
          icon={UserCog}
          title="Employees"
          to="/dashboard/employees"
        />

        <SidebarItem
          icon={CalendarCheck}
          title="Attendance"
          to="/dashboard/attendance"
        />

        <SidebarItem
          icon={CalendarDays}
          title="Leave"
          to="/dashboard/leave"
        />

        <SidebarItem
          icon={CheckSquare}
          title="Tasks"
          to="/dashboard/tasks"
        />

        <SidebarItem
          icon={BarChart3}
          title="Reports"
          to="/dashboard/reports"
        />

        <SidebarItem
          icon={Bell}
          title="Notifications"
          to="/dashboard/notifications"
        />

        {/* Settings */}
        {role === "superadmin" && (
          <SidebarItem
            icon={Settings}
            title="Settings"
            to="/dashboard/settings"
          />
        )}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;