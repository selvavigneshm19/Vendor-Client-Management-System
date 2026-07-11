const ClientStats = ({ clients }) => {
  const totalClients = clients.length;

  const activeClients = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const inactiveClients = clients.filter(
    (client) => client.status === "Inactive"
  ).length;

  const newClients = clients.filter((client) => {
    const createdDate = new Date(client.createdAt);
    const today = new Date();

    return (
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const stats = [
    {
      title: "Total Clients",
      value: totalClients,
      color: "bg-violet-600",
    },
    {
      title: "Active Clients",
      value: activeClients,
      color: "bg-green-600",
    },
    {
      title: "Inactive Clients",
      value: inactiveClients,
      color: "bg-red-600",
    },
    {
      title: "New This Month",
      value: newClients,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
        >
          <div className="text-gray-400 text-sm">
            {stat.title}
          </div>

          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-bold text-white">
              {stat.value}
            </h2>

            <div className={`w-3 h-3 rounded-full ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientStats;