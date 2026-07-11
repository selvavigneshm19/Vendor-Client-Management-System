const AttendanceStats = ({ attendance }) => {
    const total = attendance.length;

    const present = attendance.filter(
        (item) => item.status === "Present"
    ).length;

    const absent = attendance.filter(
        (item) => item.status === "Absent"
    ).length;

    const leave = attendance.filter(
        (item) =>
            item.status === "Leave" ||
            item.status === "Half Day"
    ).length;

    const Card = ({ title, value, color }) => (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">{title}</p>

                    <h2 className="text-4xl font-bold text-white mt-4">
                        {value}
                    </h2>
                </div>

                <div className={`w-3 h-3 rounded-full ${color}`} />
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
                title="Total Records"
                value={total}
                color="bg-violet-500"
            />

            <Card
                title="Present"
                value={present}
                color="bg-green-500"
            />

            <Card
                title="Absent"
                value={absent}
                color="bg-red-500"
            />

            <Card
                title="Leave / Half Day"
                value={leave}
                color="bg-yellow-500"
            />
        </div>
    );
};

export default AttendanceStats;