const LeaveStats = ({ leaves }) => {
  const total = leaves.length;

  const pending = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const approved = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const rejected = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  const Card = ({ title, value, color }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-4">
            {value}
          </h2>
        </div>

        <div className={`w-3 h-3 rounded-full ${color}`} />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      <Card
        title="Total Leaves"
        value={total}
        color="bg-violet-500"
      />

      <Card
        title="Pending"
        value={pending}
        color="bg-yellow-500"
      />

      <Card
        title="Approved"
        value={approved}
        color="bg-green-500"
      />

      <Card
        title="Rejected"
        value={rejected}
        color="bg-red-500"
      />

    </div>
  );
};

export default LeaveStats;