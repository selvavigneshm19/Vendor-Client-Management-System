import TotalVendors from "./TotalVendors";
import TotalClients from "./TotalClients";

const StatisticsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <TotalVendors />

      <TotalClients />

      <TotalVendors title="Projects" value="24" />

      <TotalClients title="Employees" value="18" />

    </div>
  );
};

export default StatisticsCards;