import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAttendanceById } from "../../services/attendanceService";

const AttendanceDetails = () => {
    const { id } = useParams();

    const [attendance, setAttendance] = useState(null);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const data = await getAttendanceById(id);
            setAttendance(data.attendance);
        } catch (error) {
            console.error(error);
        }
    };

    if (!attendance) {
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
                    to="/dashboard/attendance"
                    className="text-violet-400 hover:text-violet-300 text-sm"
                >
                    ← Back to Attendance
                </Link>

                <h1 className="text-3xl font-bold text-white mt-2">
                    Attendance Details
                </h1>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <Item
                        title="Employee"
                        value={attendance.employee?.employeeName}
                    />

                    <Item
                        title="Employee Code"
                        value={attendance.employee?.employeeCode}
                    />

                    <Item
                        title="Designation"
                        value={attendance.employee?.designation}
                    />

                    <Item
                        title="Department"
                        value={attendance.employee?.department}
                    />

                    <Item
                        title="Attendance Date"
                        value={new Date(
                            attendance.attendanceDate
                        ).toLocaleDateString()}
                    />

                    <Item
                        title="Check In"
                        value={attendance.checkIn}
                    />

                    <Item
                        title="Check Out"
                        value={attendance.checkOut}
                    />

                    <Item
                        title="Working Hours"
                        value={attendance.workingHours}
                    />

                    <Item
                        title="Status"
                        value={attendance.status}
                    />

                </div>

                <div className="mt-8">

                    <h3 className="text-white font-semibold mb-3">
                        Remarks
                    </h3>

                    <div className="bg-slate-800 rounded-xl p-5 text-gray-300">
                        {attendance.remarks || "-"}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AttendanceDetails;