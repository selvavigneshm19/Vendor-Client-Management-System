import {
    Shield,
    ShieldCheck,
    ShieldX,
} from "lucide-react";

const AdminStats = ({ stats }) => {

    const cards = [
        {
            title: "Total Admins",
            value: stats.totalAdmins || 0,
            icon: Shield,
            color: "bg-blue-600",
        },
        {
            title: "Active Admins",
            value: stats.activeAdmins || 0,
            icon: ShieldCheck,
            color: "bg-green-600",
        },
        {
            title: "Inactive Admins",
            value: stats.inactiveAdmins || 0,
            icon: ShieldX,
            color: "bg-red-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (
                    <div
                        key={index}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                    >
                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-400">
                                    {card.title}
                                </p>

                                <h2 className="text-3xl font-bold text-white mt-2">
                                    {card.value}
                                </h2>

                            </div>

                            <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
                            >
                                <Icon
                                    size={28}
                                    className="text-white"
                                />
                            </div>

                        </div>
                    </div>
                );

            })}

        </div>
    );
};

export default AdminStats;