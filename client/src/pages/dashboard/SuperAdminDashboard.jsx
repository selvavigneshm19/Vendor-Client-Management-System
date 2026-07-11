import ClientGrowthChart from "../../components/dashboard/ClientGrowthChart";
import NotificationsCard from "../../components/dashboard/NotificationsCard";
import PendingTasks from "../../components/dashboard/PendingTasks";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentClients from "../../components/dashboard/RecentClients";
import RecentVendors from "../../components/dashboard/RecentVendors";
import RevenueChart from "../../components/dashboard/RevenueChart";
import StatisticsCards from "../../components/dashboard/StatisticsCards";
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