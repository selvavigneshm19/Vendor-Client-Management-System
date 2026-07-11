import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AttendanceForm from "../../components/attendance/AttendanceForm";
import { createAttendance } from "../../services/attendanceService";

const AddAttendance = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createAttendance(formData);

            alert("Attendance created successfully");

            navigate("/dashboard/attendance");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create attendance"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Mark Attendance
                </h1>

                <p className="text-gray-400 mt-1">
                    Create a new attendance record.
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

export default AddAttendance;