import useAuth from "../../hooks/useAuth";

import AdminDashboard from "./AdminDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import VendorDashboard from "./VendorDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "superadmin":
      return <SuperAdminDashboard />;

    case "admin":
      return <AdminDashboard />;

    case "vendor":
      return <VendorDashboard />;

    default:
      return (
        <div className="text-white text-center py-20">
          Unauthorized
        </div>
      );
  }
};

export default Dashboard;