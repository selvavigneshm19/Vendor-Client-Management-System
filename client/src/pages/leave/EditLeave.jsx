import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LeaveForm from "../../components/leave/LeaveForm";

import {
    getLeaveById,
    updateLeave,
} from "../../services/leaveService";

const EditLeave = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        employee: "",
        leaveType: "",
        fromDate: "",
        toDate: "",
        totalDays: "",
        reason: "",
        status: "Pending",
        remarks: "",
    });

    useEffect(() => {
        fetchLeave();
    }, []);

    const fetchLeave = async () => {
        try {
            const data = await getLeaveById(id);

            const leave = data.leave;

            setFormData({
                employee: leave.employee?._id || "",
                leaveType: leave.leaveType || "",
                fromDate: leave.fromDate
                    ? leave.fromDate.substring(0, 10)
                    : "",
                toDate: leave.toDate
                    ? leave.toDate.substring(0, 10)
                    : "",
                totalDays: leave.totalDays || "",
                reason: leave.reason || "",
                status: leave.status || "Pending",
                remarks: leave.remarks || "",
            });

        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await updateLeave(id, formData);

            alert("Leave updated successfully");

            navigate("/dashboard/leave");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update leave"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Edit Leave
                </h1>

                <p className="text-gray-400 mt-1">
                    Update leave details.
                </p>

            </div>

            <LeaveForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
            />

        </div>
    );
};

export default EditLeave;