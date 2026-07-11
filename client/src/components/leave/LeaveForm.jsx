import { useEffect, useState } from "react";

import { getEmployees } from "../../services/employeeService";

const LeaveForm = ({
    formData,
    setFormData,
    onSubmit,
    loading,
}) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();

            setEmployees(data.employees || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        // Automatically calculate Total Days
        if (updatedData.fromDate && updatedData.toDate) {
            const from = new Date(updatedData.fromDate);
            const to = new Date(updatedData.toDate);

            const diff =
                Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

            updatedData.totalDays = diff > 0 ? diff : "";
        } else {
            updatedData.totalDays = "";
        }

        setFormData(updatedData);
    };

    return (
        <form
            onSubmit={onSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Employee */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Employee *
                    </label>

                    <select
                        name="employee"
                        value={formData.employee}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    >
                        <option value="">
                            Select Employee
                        </option>

                        {employees.map((employee) => (
                            <option
                                key={employee._id}
                                value={employee._id}
                            >
                                {employee.employeeName}
                            </option>
                        ))}

                    </select>

                </div>

                {/* Leave Type */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Leave Type *
                    </label>

                    <select
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    >
                        <option value="">
                            Select Leave Type
                        </option>

                        <option value="Casual Leave">
                            Casual Leave
                        </option>

                        <option value="Sick Leave">
                            Sick Leave
                        </option>

                        <option value="Earned Leave">
                            Earned Leave
                        </option>

                        <option value="Maternity Leave">
                            Maternity Leave
                        </option>

                        <option value="Paternity Leave">
                            Paternity Leave
                        </option>

                        <option value="Loss of Pay">
                            Loss of Pay
                        </option>

                    </select>

                </div>

                {/* From Date */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        From Date *
                    </label>

                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />

                </div>

                {/* To Date */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        To Date *
                    </label>

                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />

                </div>
                {/* Total Days */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Total Days
                    </label>

                    <input
                        type="number"
                        name="totalDays"
                        value={formData.totalDays}
                        readOnly
                        className="w-full rounded-xl bg-slate-700 p-3 text-white cursor-not-allowed"
                        placeholder="Automatically calculated"
                    />

                </div>

                {/* Status */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >
                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Approved">
                            Approved
                        </option>

                        <option value="Rejected">
                            Rejected
                        </option>

                    </select>

                </div>

                {/* Reason */}

                <div className="md:col-span-2">

                    <label className="block text-gray-300 mb-2">
                        Reason *
                    </label>

                    <textarea
                        rows="4"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Enter leave reason..."
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />

                </div>

                {/* Remarks */}

                <div className="md:col-span-2">

                    <label className="block text-gray-300 mb-2">
                        Remarks
                    </label>

                    <textarea
                        rows="3"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Additional remarks..."
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-8">

                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-gray-300 hover:bg-slate-800 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition"
                >
                    {loading
                        ? "Saving..."
                        : "Save Leave"}
                </button>

            </div>

        </form>
    );
};

export default LeaveForm;