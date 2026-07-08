import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: Icon, title, to }) => {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-lg"
            : "text-gray-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{title}</span>
    </NavLink>
  );
};

export default SidebarItem;