import {
  Bell,
  Search,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

      <div>

        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400">
          Welcome back, {user?.name || "User"} 👋
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-xl bg-slate-800 text-white outline-none w-72"
          />

        </div>

        <button className="relative p-3 rounded-xl bg-slate-800 hover:bg-slate-700">

          <Bell size={20} />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

      </div>

    </header>
  );
};

export default Navbar;