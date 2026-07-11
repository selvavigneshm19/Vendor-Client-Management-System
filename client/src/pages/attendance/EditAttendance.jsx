import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AttendanceForm from "../../components/attendance/AttendanceForm";

import {
    getAttendanceById,
    updateAttendance,
} from "../../services/attendanceService";

const EditAttendance = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        employee: "",
        attendanceDate: "",
        checkIn: "",
        checkOut: "",
        workingHours: "",
        status: "Present",
        remarks: "",
    });

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const data = await getAttendanceById(id);

            const attendance = data.attendance;

            setFormData({
                employee: attendance.employee?._id || "",
                attendanceDate: attendance.attendanceDate
                    ? attendance.attendanceDate.substring(0, 10)
                    : "",
                checkIn: attendance.checkIn || "",
                checkOut: attendance.checkOut || "",
                workingHours: attendance.workingHours || "",
                status: attendance.status || "Present",
                remarks: attendance.remarks || "",
            });

        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await updateAttendance(id, formData);

            alert("Attendance updated successfully");

            navigate("/dashboard/attendance");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update attendance"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Edit Attendance
                </h1>

                <p className="text-gray-400 mt-1">
                    Update attendance details.
                </p>

            </div>

            <AttendanceForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
            />

        </div>
    );
};

export default EditAttendance;