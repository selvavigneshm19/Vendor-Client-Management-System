import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PayrollForm from "../../components/payroll/PayrollForm";
import { createPayroll } from "../../services/payrollService";

const AddPayroll = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        employee: "",
        month: "",
        year: new Date().getFullYear(),
        basicSalary: "",
        allowances: 0,
        deductions: 0,
        bonus: 0,
        netSalary: 0,
        paymentStatus: "Pending",
        paymentDate: "",
        remarks: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createPayroll(formData);

            alert("Payroll created successfully");

            navigate("/dashboard/payroll");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create payroll"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Add Payroll
                </h1>

                <p className="text-gray-400 mt-1">
                    Create a payroll record.
                </p>

            </div>

            <PayrollForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
            />

        </div>
    );
};

export default AddPayroll;