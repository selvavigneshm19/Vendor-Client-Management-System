const ProjectStats = ({ projects }) => {
  const totalProjects = projects.length;

  const planning = projects.filter(
    (project) => project.status === "Planning"
  ).length;

  const inProgress = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completed = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      color: "bg-violet-600",
    },
    {
      title: "Planning",
      value: planning,
      color: "bg-blue-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      color: "bg-yellow-500",
    },
    {
      title: "Completed",
      value: completed,
      color: "bg-green-600",
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

          <div className="flex justify-between items-center mt-3">
            <h2 className="text-3xl font-bold text-white">
              {stat.value}
            </h2>

            <div
              className={`w-3 h-3 rounded-full ${stat.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;