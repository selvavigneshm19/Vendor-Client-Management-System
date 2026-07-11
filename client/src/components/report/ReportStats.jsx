import {
    CalendarCheck,
    CalendarDays,
    CheckSquare,
    Users,
    Wallet,
} from "lucide-react";

const ReportStats = ({
    employees = 0,
    attendance = 0,
    leaves = 0,
    payroll = 0,
    tasks = 0,
}) => {

    const stats = [
        {
            title: "Employees",
            value: employees,
            icon: Users,
            color: "bg-blue-600",
        },
        {
            title: "Attendance",
            value: attendance,
            icon: CalendarCheck,
            color: "bg-green-600",
        },
        {
            title: "Leaves",
            value: leaves,
            icon: CalendarDays,
            color: "bg-yellow-500",
        },
        {
            title: "Payroll",
            value: payroll,
            icon: Wallet,
            color: "bg-violet-600",
        },
        {
            title: "Tasks",
            value: tasks,
            icon: CheckSquare,
            color: "bg-orange-600",
        },
    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

            {stats.map((item) => {

                const Icon = item.icon;

                return (

                    <div
                        key={item.title}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-400 text-sm">
                                    {item.title}
                                </p>

                                <h2 className="text-3xl font-bold text-white mt-2">
                                    {item.value}
                                </h2>

                            </div>

                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
                            >
                                <Icon className="text-white" />
                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default ReportStats;