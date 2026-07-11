const PayrollStats = ({ payrolls }) => {
    const totalPayroll = payrolls.length;

    const paidPayroll = payrolls.filter(
        (payroll) => payroll.paymentStatus === "Paid"
    ).length;

    const pendingPayroll = payrolls.filter(
        (payroll) => payroll.paymentStatus === "Pending"
    ).length;

    const processingPayroll = payrolls.filter(
        (payroll) => payroll.paymentStatus === "Processing"
    ).length;

    const totalSalary = payrolls.reduce(
        (sum, payroll) => sum + (Number(payroll.netSalary) || 0),
        0
    );

    const stats = [
        {
            title: "Total Payroll",
            value: totalPayroll,
            color: "bg-blue-600",
        },
        {
            title: "Paid",
            value: paidPayroll,
            color: "bg-green-600",
        },
        {
            title: "Pending",
            value: pendingPayroll,
            color: "bg-yellow-500",
        },
        {
            title: "Processing",
            value: processingPayroll,
            color: "bg-violet-600",
        },
        {
            title: "Total Salary",
            value: `₹ ${totalSalary.toLocaleString()}`,
            color: "bg-emerald-600",
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
                        className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white font-bold text-lg`}
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

export default PayrollStats;