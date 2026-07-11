const TaskStats = ({ tasks }) => {
    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const onHoldTasks = tasks.filter(
        (task) => task.status === "On Hold"
    ).length;

    const stats = [
        {
            title: "Total Tasks",
            value: totalTasks,
            color: "bg-blue-600",
        },
        {
            title: "Pending",
            value: pendingTasks,
            color: "bg-yellow-500",
        },
        {
            title: "In Progress",
            value: inProgressTasks,
            color: "bg-violet-600",
        },
        {
            title: "Completed",
            value: completedTasks,
            color: "bg-green-600",
        },
        {
            title: "On Hold",
            value: onHoldTasks,
            color: "bg-red-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >
                    <div
                        className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white text-lg font-bold`}
                    >
                        {stat.title.charAt(0)}
                    </div>

                    <h3 className="text-gray-400 mt-4">
                        {stat.title}
                    </h3>

                    <p className="text-3xl font-bold text-white mt-2">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TaskStats;