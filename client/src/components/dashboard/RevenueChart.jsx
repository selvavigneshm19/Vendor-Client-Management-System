import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 14000 },
  { month: "Apr", revenue: 26000 },
  { month: "May", revenue: 20000 },
  { month: "Jun", revenue: 32000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Revenue Overview
        </h2>

        <p className="text-gray-400 text-sm">
          Monthly revenue generated
        </p>
      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#revenue)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RevenueChart;