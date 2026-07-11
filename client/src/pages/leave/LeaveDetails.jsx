import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getLeaveById } from "../../services/leaveService";

const LeaveDetails = () => {
    const { id } = useParams();

    const [leave, setLeave] = useState(null);

    useEffect(() => {
        fetchLeave();
    }, []);

    const fetchLeave = async () => {
        try {
            const data = await getLeaveById(id);
            setLeave(data.leave);
        } catch (error) {
            console.error(error);
        }
    };

    if (!leave) {
        return (
            <div className="text-white">
                Loading...
            </div>
        );
    }

    const Item = ({ title, value }) => (
        <div className="bg-slate-800 rounded-xl p-5">
            <p className="text-sm text-gray-400">
                {title}
            </p>

            <h3 className="text-white font-semibold mt-2">
                {value || "-"}
            </h3>
        </div>
    );

    return (
        <div className="space-y-6">

            <div>

                <Link
                    to="/dashboard/leaves"
                    className="text-violet-400 hover:text-violet-300 text-sm"
                >
                    ← Back to Leaves
                </Link>

                <h1 className="text-3xl font-bold text-white mt-2">
                    Leave Details
                </h1>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <Item
                        title="Employee"
                        value={leave.employee?.employeeName}
                    />

                    <Item
                        title="Employee Code"
                        value={leave.employee?.employeeCode}
                    />

                    <Item
                        title="Designation"
                        value={leave.employee?.designation}
                    />

                    <Item
                        title="Department"
                        value={leave.employee?.department}
                    />

                    <Item
                        title="Leave Type"
                        value={leave.leaveType}
                    />

                    <Item
                        title="From Date"
                        value={new Date(
                            leave.fromDate
                        ).toLocaleDateString()}
                    />

                    <Item
                        title="To Date"
                        value={new Date(
                            leave.toDate
                        ).toLocaleDateString()}
                    />

                    <Item
                        title="Total Days"
                        value={leave.totalDays}
                    />

                    <Item
                        title="Status"
                        value={leave.status}
                    />

                    <Item
                        title="Approved By"
                        value={leave.approvedBy?.name || "-"}
                    />

                </div>

                <div className="mt-8">

                    <h3 className="text-white font-semibold mb-3">
                        Reason
                    </h3>

                    <div className="bg-slate-800 rounded-xl p-5 text-gray-300">
                        {leave.reason}
                    </div>

                </div>

                <div className="mt-6">

                    <h3 className="text-white font-semibold mb-3">
                        Remarks
                    </h3>

                    <div className="bg-slate-800 rounded-xl p-5 text-gray-300">
                        {leave.remarks || "-"}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default LeaveDetails;