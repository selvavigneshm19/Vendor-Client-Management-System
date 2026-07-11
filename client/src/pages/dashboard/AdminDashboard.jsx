import NotificationsCard from "../../components/dashboard/NotificationsCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentVendors from "../../components/dashboard/RecentVendors";
import RevenueChart from "../../components/dashboard/RevenueChart";
import StatisticsCards from "../../components/dashboard/StatisticsCards";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";

const AdminDashboard = () => {
    return (
        <div className="space-y-6">

            <WelcomeBanner />

            <StatisticsCards />

            <RevenueChart />

            <RecentVendors />

            <div className="grid grid-cols-2 gap-6">

                <NotificationsCard />

                <QuickActions />

            </div>

        </div>
    );
};

export default AdminDashboard;