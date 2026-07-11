const EmployeeStats = ({ employees }) => {
    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        (employee) => employee.status === "Active"
    ).length;

    const onLeave = employees.filter(
        (employee) => employee.status === "On Leave"
    ).length;

    const inactiveEmployees = employees.filter(
        (employee) => employee.status === "Inactive"
    ).length;

    const stats = [
        {
            title: "Total Employees",
            value: totalEmployees,
            color: "bg-violet-600",
        },
        {
            title: "Active",
            value: activeEmployees,
            color: "bg-green-600",
        },
        {
            title: "On Leave",
            value: onLeave,
            color: "bg-yellow-500",
        },
        {
            title: "Inactive",
            value: inactiveEmployees,
            color: "bg-red-600",
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

export default EmployeeStats;