import {
    Bell,
    Briefcase,
    Palette,
    SlidersHorizontal,
} from "lucide-react";

const menuItems = [
    {
        id: "company",
        label: "Company",
        icon: Briefcase,
    },
    {
        id: "preferences",
        label: "Preferences",
        icon: SlidersHorizontal,
    },
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette,
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
    },
];

const SettingsSidebar = ({
    activeTab,
    setActiveTab,
}) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">

            <h2 className="text-white text-lg font-semibold mb-4">
                Settings
            </h2>

            <div className="space-y-2">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === item.id
                                    ? "bg-violet-600 text-white"
                                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >

                            <Icon size={20} />

                            <span className="font-medium">
                                {item.label}
                            </span>

                        </button>

                    );

                })}

            </div>

        </div>
    );
};

export default SettingsSidebar;