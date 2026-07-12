const NotificationsCard = () => {
  const notifications = [
    {
      title: "New Vendor Registered",
      time: "5 min ago",
    },
    {
      title: "Project Completed",
      time: "30 min ago",
    },
    {
      title: "Payroll Generated",
      time: "1 hour ago",
    },
    {
      title: "New Client Added",
      time: "Today",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 h-72">

      <h2 className="text-xl font-semibold text-white mb-6">
        Notifications
      </h2>

      <div className="space-y-4">

        {notifications.map((item, index) => (

          <div
            key={index}
            className="flex justify-between border-b border-slate-800 pb-3"
          >
            <div>

              <p className="text-white">
                {item.title}
              </p>

              <p className="text-sm text-gray-400">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default NotificationsCard;