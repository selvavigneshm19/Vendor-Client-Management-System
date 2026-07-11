import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPayrollById } from "../../services/payrollService";

const PayrollDetails = () => {
    const { id } = useParams();

    const [payroll, setPayroll] = useState(null);

    useEffect(() => {
        fetchPayroll();
    }, []);

    const fetchPayroll = async () => {
        try {
            const data = await getPayrollById(id);
            setPayroll(data.payroll);
        } catch (error) {
            console.error(error);
        }
    };

    if (!payroll) {
        return (
            <div className="text-white">
                Loading Payroll...
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h1 className="text-3xl font-bold text-white mb-8">
                Payroll Details
            </h1>

            <div className="grid grid-cols-2 gap-6 text-white">

                <p><strong>Employee:</strong> {payroll.employee?.employeeName}</p>
                <p><strong>Month:</strong> {payroll.month}</p>
                <p><strong>Year:</strong> {payroll.year}</p>
                <p><strong>Basic Salary:</strong> ₹ {payroll.basicSalary}</p>
                <p><strong>Allowances:</strong> ₹ {payroll.allowances}</p>
                <p><strong>Bonus:</strong> ₹ {payroll.bonus}</p>
                <p><strong>Deductions:</strong> ₹ {payroll.deductions}</p>
                <p><strong>Net Salary:</strong> ₹ {payroll.netSalary}</p>
                <p><strong>Status:</strong> {payroll.paymentStatus}</p>
                <p>
                    <strong>Payment Date:</strong>{" "}
                    {payroll.paymentDate
                        ? new Date(
                            payroll.paymentDate
                        ).toLocaleDateString()
                        : "-"}
                </p>

                <div className="col-span-2">
                    <strong>Remarks:</strong>
                    <p className="mt-2 text-gray-300">
                        {payroll.remarks || "-"}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default PayrollDetails;