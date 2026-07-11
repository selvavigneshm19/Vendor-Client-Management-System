import { useEffect, useState } from "react";

import { getEmployees } from "../../services/employeeService";

const PayrollForm = ({
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

    // Auto Calculate Net Salary
    const basicSalary =
      Number(updatedData.basicSalary) || 0;

    const allowances =
      Number(updatedData.allowances) || 0;

    const bonus =
      Number(updatedData.bonus) || 0;

    const deductions =
      Number(updatedData.deductions) || 0;

    updatedData.netSalary =
      basicSalary +
      allowances +
      bonus -
      deductions;

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

        {/* Month */}

        <div>

          <label className="block text-gray-300 mb-2">
            Payroll Month *
          </label>

          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          >
            <option value="">Select Month</option>

            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>

          </select>

        </div>

        {/* Year */}

        <div>

          <label className="block text-gray-300 mb-2">
            Payroll Year *
          </label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            placeholder="2026"
            required
          />

        </div>

        {/* Basic Salary */}

        <div>

          <label className="block text-gray-300 mb-2">
            Basic Salary *
          </label>

          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            placeholder="75000"
            required
          />

        </div>
                {/* Allowances */}

        <div>

          <label className="block text-gray-300 mb-2">
            Allowances
          </label>

          <input
            type="number"
            name="allowances"
            value={formData.allowances}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            placeholder="5000"
            min="0"
          />

        </div>

        {/* Bonus */}

        <div>

          <label className="block text-gray-300 mb-2">
            Bonus
          </label>

          <input
            type="number"
            name="bonus"
            value={formData.bonus}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            placeholder="2000"
            min="0"
          />

        </div>

        {/* Deductions */}

        <div>

          <label className="block text-gray-300 mb-2">
            Deductions
          </label>

          <input
            type="number"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            placeholder="1000"
            min="0"
          />

        </div>

        {/* Net Salary */}

        <div>

          <label className="block text-gray-300 mb-2">
            Net Salary
          </label>

          <input
            type="number"
            name="netSalary"
            value={formData.netSalary}
            readOnly
            className="w-full rounded-xl bg-slate-700 p-3 text-white cursor-not-allowed"
            placeholder="Automatically calculated"
          />

        </div>

        {/* Payment Status */}

        <div>

          <label className="block text-gray-300 mb-2">
            Payment Status
          </label>

          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Paid">
              Paid
            </option>

          </select>

        </div>

        {/* Payment Date */}

        <div>

          <label className="block text-gray-300 mb-2">
            Payment Date
          </label>

          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>
                {/* Remarks */}

        <div className="md:col-span-2">

          <label className="block text-gray-300 mb-2">
            Remarks
          </label>

          <textarea
            rows="4"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter remarks..."
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
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Payroll"}
        </button>

      </div>

    </form>
  );
};

export default PayrollForm;