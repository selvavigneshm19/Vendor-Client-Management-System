import ClientGrowthChart from "../../components/dashboard/ClientGrowthChart";
import RecentClients from "../../components/dashboard/RecentClients";
import RevenueChart from "../../components/dashboard/RevenueChart";
import NotificationsCard from "../../components/dashboard/vendor/NotificationsCard";
import PendingTasks from "../../components/dashboard/vendor/PendingTasks";
import QuickActions from "../../components/dashboard/vendor/QuickActions";
import RecentVendors from "../../components/dashboard/vendor/RecentVendors";
import StatisticsCards from "../../components/dashboard/vendor/StatisticsCards";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";

const SuperAdminDashboard = () => {
    return (
        <div className="space-y-6">

            <WelcomeBanner />

            <StatisticsCards />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <RevenueChart />

                <ClientGrowthChart />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <RecentVendors />

                <RecentClients />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <PendingTasks />

                <NotificationsCard />

                <QuickActions />

            </div>

        </div>
    );
};

export default SuperAdminDashboard;