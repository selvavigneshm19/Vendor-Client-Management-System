import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#0F172A]">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-900">

        <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl top-10 left-10"></div>

        <div className="absolute w-80 h-80 rounded-full bg-pink-500 opacity-20 blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 text-white px-16">
          <h1 className="text-5xl font-bold leading-tight">
            Vendor Client
            <br />
            Management
            <br />
            System
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-8">
            Manage Vendors, Clients, Projects,
            Employees and Payroll in one modern platform.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-950">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;