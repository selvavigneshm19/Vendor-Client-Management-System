import RevenueChart from "../../components/dashboard/RevenueChart";
import NotificationsCard from "../../components/dashboard/vendor/NotificationsCard";
import QuickActions from "../../components/dashboard/vendor/QuickActions";
import RecentVendors from "../../components/dashboard/vendor/RecentVendors";
import StatisticsCards from "../../components/dashboard/vendor/StatisticsCards";
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