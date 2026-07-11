
const ReportCards = ({ cards = [] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <div
                        key={index}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                    >
                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-gray-400 text-sm">
                                    {card.title}
                                </p>

                                <h2 className="text-3xl font-bold text-white mt-2">
                                    {card.value}
                                </h2>

                                <p className="text-xs text-gray-500 mt-2">
                                    {card.subtitle}
                                </p>

                            </div>

                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
                            >
                                {Icon && <Icon size={24} className="text-white" />}
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReportCards;