import RecentClients from "../../components/dashboard/RecentClients";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import NotificationsCard from "../../components/dashboard/vendor/NotificationsCard";
import PendingTasks from "../../components/dashboard/vendor/PendingTasks";
import QuickActions from "../../components/dashboard/vendor/QuickActions";
import VendorStatisticsCards from "../../components/dashboard/vendor/StatisticsCards";

const VendorDashboard = () => {
    return (
        <div className="space-y-6">

            <WelcomeBanner />

            <VendorStatisticsCards />

            <div className="grid grid-cols-2 gap-6">
                <RecentClients />
                <PendingTasks />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <NotificationsCard />
                <QuickActions />
            </div>

        </div>
    );
};

export default VendorDashboard;