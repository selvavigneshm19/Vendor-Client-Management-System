import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatisticsCards from "../../components/dashboard/StatisticsCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import ClientGrowthChart from "../../components/dashboard/ClientGrowthChart";
import RecentVendors from "../../components/dashboard/RecentVendors";
import RecentClients from "../../components/dashboard/RecentClients";
import PendingTasks from "../../components/dashboard/PendingTasks";
import NotificationsCard from "../../components/dashboard/NotificationsCard";
import QuickActions from "../../components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      <WelcomeBanner />

      <StatisticsCards />

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RevenueChart />

        <ClientGrowthChart />

      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentVendors />

        <RecentClients />

      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <PendingTasks />

        <NotificationsCard />

        <QuickActions />

      </div>

    </div>
  );
};

export default Dashboard;