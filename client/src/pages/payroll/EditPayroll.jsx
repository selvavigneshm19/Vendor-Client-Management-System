import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PayrollForm from "../../components/payroll/PayrollForm";

import {
    getPayrollById,
    updatePayroll,
} from "../../services/payrollService";

const EditPayroll = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        employee: "",
        month: "",
        year: "",
        basicSalary: "",
        allowances: "",
        deductions: "",
        bonus: "",
        netSalary: "",
        paymentStatus: "Pending",
        paymentDate: "",
        remarks: "",
    });

    useEffect(() => {
        fetchPayroll();
    }, []);

    const fetchPayroll = async () => {
        try {
            const data = await getPayrollById(id);

            const payroll = data.payroll;

            setFormData({
                employee: payroll.employee?._id || "",
                month: payroll.month || "",
                year: payroll.year || "",
                basicSalary: payroll.basicSalary || "",
                allowances: payroll.allowances || "",
                deductions: payroll.deductions || "",
                bonus: payroll.bonus || "",
                netSalary: payroll.netSalary || "",
                paymentStatus:
                    payroll.paymentStatus || "Pending",
                paymentDate: payroll.paymentDate
                    ? payroll.paymentDate.substring(0, 10)
                    : "",
                remarks: payroll.remarks || "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await updatePayroll(id, formData);

            alert("Payroll updated successfully");

            navigate("/dashboard/payroll");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update payroll"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Edit Payroll
                </h1>

                <p className="text-gray-400 mt-1">
                    Update payroll details.
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

export default EditPayroll;