import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  DollarSign,
  FolderGit2,
  Heart,
  Mail,
  Phone,
  ShieldCheck,
  User,
  UserCheck
} from "lucide-react";

import { getEmployeeById } from "../../services/employeeService";

const EmployeeDetails = () => {
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
      alert("Failed to load employee details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading Employee Details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-red-500">
        Employee not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <button
            onClick={() => navigate("/dashboard/employees")}
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-5"
          >
            <ArrowLeft size={18} />
            Back to Employees
          </button>

          <h1 className="text-4xl font-bold text-white">
            {employee.employeeName}
          </h1>

          <p className="text-gray-400 mt-2">
            Employee Details & Profile
          </p>

        </div>

      </div>

      {/* Information Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <InfoCard
            icon={User}
            title="Employee Name"
            value={employee.employeeName}
          />

          <InfoCard
            icon={ShieldCheck}
            title="Employee Code"
            value={employee.employeeCode}
          />

          <InfoCard
            icon={Mail}
            title="Email"
            value={employee.email}
          />

          <InfoCard
            icon={Phone}
            title="Phone"
            value={employee.phone}
          />

          <InfoCard
            icon={Phone}
            title="Alternate Phone"
            value={employee.alternatePhone}
          />

          <InfoCard
            icon={UserCheck}
            title="Gender"
            value={employee.gender}
          />

          <InfoCard
            icon={Calendar}
            title="Date of Birth"
            value={employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : ""}
          />

          <InfoCard
            icon={Calendar}
            title="Joining Date"
            value={employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : ""}
          />

          <InfoCard
            icon={Briefcase}
            title="Designation"
            value={employee.designation}
          />

          <InfoCard
            icon={Briefcase}
            title="Department"
            value={employee.department}
          />

          <InfoCard
            icon={Briefcase}
            title="Employment Type"
            value={employee.employmentType}
          />

          <InfoCard
            icon={DollarSign}
            title="Salary"
            value={employee.salary ? `₹${employee.salary.toLocaleString()}` : ""}
          />

          <InfoCard
            icon={FolderGit2}
            title="Project"
            value={employee.project?.projectName}
          />

          <InfoCard
            icon={User}
            title="Manager"
            value={employee.manager}
          />

          <InfoCard
            icon={Award}
            title="Skills"
            value={employee.skills && employee.skills.length > 0 ? employee.skills.join(", ") : "-"}
          />

          <InfoCard
            icon={Heart}
            title="Blood Group"
            value={employee.bloodGroup}
          />

          <InfoCard
            icon={ShieldCheck}
            title="Status"
            value={employee.status}
          />

          <InfoCard
            icon={User}
            title="Emergency Contact Name"
            value={employee.emergencyContactName}
          />

          <InfoCard
            icon={Phone}
            title="Emergency Contact Phone"
            value={employee.emergencyContactPhone}
          />

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-semibold text-white mb-3">
            Address
          </h2>

          <p className="text-gray-300">
            {employee.address ? `${employee.address}, ${employee.city || ""}, ${employee.state || ""}, ${employee.country || ""} ${employee.pincode || ""}` : "-"}
          </p>

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-semibold text-white mb-3">
            Notes
          </h2>

          <p className="text-gray-300">
            {employee.notes || "-"}
          </p>

        </div>

      </div>

    </div>
  );
};

const InfoCard = ({
  icon: Icon,
  title,
  value,
}) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-5">

      <div className="flex items-center gap-3 mb-3">

        <Icon
          size={22}
          className="text-violet-400"
        />

        <span className="text-gray-400">
          {title}
        </span>

      </div>

      <p className="text-white text-lg font-medium">
        {value || "-"}
      </p>

    </div>
  );
};

export default EmployeeDetails;
