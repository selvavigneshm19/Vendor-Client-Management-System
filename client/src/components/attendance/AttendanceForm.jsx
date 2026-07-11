import { useEffect, useState } from "react";

import { getEmployees } from "../../services/employeeService";

const AttendanceForm = ({
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

    // Automatically calculate working hours
    if (updatedData.checkIn && updatedData.checkOut) {
      const start = new Date(`1970-01-01T${updatedData.checkIn}`);
      const end = new Date(`1970-01-01T${updatedData.checkOut}`);

      let diff = (end - start) / (1000 * 60 * 60);

      // Prevent negative values
      if (diff < 0) {
        diff = 0;
      }

      updatedData.workingHours = Number(diff.toFixed(2));
    } else {
      updatedData.workingHours = "";
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

        {/* Attendance Date */}

        <div>

          <label className="block text-gray-300 mb-2">
            Attendance Date *
          </label>

          <input
            type="date"
            name="attendanceDate"
            value={formData.attendanceDate}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            required
          />

        </div>

        {/* Check In */}

        <div>

          <label className="block text-gray-300 mb-2">
            Check In
          </label>

          <input
            type="time"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>

        {/* Check Out */}

        <div>

          <label className="block text-gray-300 mb-2">
            Check Out
          </label>

          <input
            type="time"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>
        {/* Working Hours */}

        <div>

          <label className="block text-gray-300 mb-2">
            Working Hours
          </label>

          <input
            type="number"
            step="0.01"
            name="workingHours"
            value={formData.workingHours}
            readOnly
            className="w-full rounded-xl bg-slate-700 p-3 text-white cursor-not-allowed"
            placeholder="Automatically calculated"
          />

        </div>

        {/* Status */}

        <div>

          <label className="block text-gray-300 mb-2">
            Status *
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Half Day">
              Half Day
            </option>

            <option value="Leave">
              Leave
            </option>

            <option value="Work From Home">
              Work From Home
            </option>

          </select>

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
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition"
        >
          {loading
            ? "Saving..."
            : "Save Attendance"}
        </button>

      </div>

    </form>
  );
};

export default AttendanceForm;