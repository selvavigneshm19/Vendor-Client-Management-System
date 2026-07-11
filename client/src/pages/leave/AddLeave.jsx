import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LeaveForm from "../../components/leave/LeaveForm";
import { createLeave } from "../../services/leaveService";

const AddLeave = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createLeave(formData);

            alert("Leave created successfully");

            navigate("/dashboard/leave");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create leave"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Apply Leave
                </h1>

                <p className="text-gray-400 mt-1">
                    Create a new leave request.
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

export default AddLeave;