import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#FACC15",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
];

const ReportCharts = ({
    title,
    data = [],
    type = "pie",
    dataKey = "value",
    nameKey = "name",
}) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold text-white mb-6">
                {title}
            </h2>

            <div className="h-96">

                <ResponsiveContainer width="100%" height="100%">

                    {type === "pie" ? (

                        <PieChart>

                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={130}
                                dataKey={dataKey}
                                nameKey={nameKey}
                                label
                            >

                                {data.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />

                                ))}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    ) : (

                        <BarChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey={nameKey} />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey={dataKey}
                                radius={[8, 8, 0, 0]}
                            >

                                {data.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />

                                ))}

                            </Bar>

                        </BarChart>

                    )}

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default ReportCharts;