import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { month: "Jan", clients: 12 },
    { month: "Feb", clients: 18 },
    { month: "Mar", clients: 25 },
    { month: "Apr", clients: 34 },
    { month: "May", clients: 48 },
    { month: "Jun", clients: 62 },
];

const ClientGrowthChart = () => {
    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg">

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Client Growth
                </h2>

                <p className="text-gray-400 text-sm">
                    New clients each month
                </p>
            </div>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

                        <XAxis
                            dataKey="month"
                            stroke="#94A3B8"
                        />

                        <YAxis stroke="#94A3B8" />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="clients"
                            stroke="#06B6D4"
                            strokeWidth={4}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default ClientGrowthChart;