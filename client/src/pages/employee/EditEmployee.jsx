import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../../components/employee/EmployeeForm";
import { getEmployeeById } from "../../services/employeeService";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const data = await getEmployeeById(id);

      setEmployee(data.employee);
    } catch (error) {
      console.error(error);

      alert("Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading Employee...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <button
          onClick={() => navigate("/dashboard/employees")}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-5"
        >
          <ArrowLeft size={18} />
          Back to Employees
        </button>

        <h1 className="text-4xl font-bold text-white">
          Edit Employee
        </h1>

        <p className="text-gray-400 mt-2">
          Update employee information.
        </p>

      </div>

      <EmployeeForm
        isEdit={true}
        initialData={employee}
      />

    </div>
  );
};

export default EditEmployee;
