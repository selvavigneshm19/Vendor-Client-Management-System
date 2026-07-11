import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getEmployees } from "../../services/employeeService";

import EmployeeFilters from "../../components/employee/EmployeeFilters";
import EmployeeSearch from "../../components/employee/EmployeeSearch";
import EmployeeStats from "../../components/employee/EmployeeStats";
import EmployeeTable from "../../components/employee/EmployeeTable";

const EmployeeList = () => {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const data = await getEmployees();

            setEmployees(data.employees || []);
            setFilteredEmployees(data.employees || []);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        let filtered = [...employees];

        // Search
        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();

            filtered = filtered.filter((employee) => {
                return (
                    employee.employeeName?.toLowerCase().includes(search) ||
                    employee.employeeCode?.toLowerCase().includes(search) ||
                    employee.email?.toLowerCase().includes(search) ||
                    employee.phone?.toLowerCase().includes(search) ||
                    employee.designation?.toLowerCase().includes(search) ||
                    employee.project?.projectName
                        ?.toLowerCase()
                        .includes(search)
                );
            });
        }

        // Status Filter
        if (statusFilter !== "All") {
            filtered = filtered.filter(
                (employee) => employee.status === statusFilter
            );
        }

        setFilteredEmployees(filtered);
    }, [employees, searchTerm, statusFilter]);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Employee Management
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage all employees in one place.
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate("/dashboard/employees/add")
                    }
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition"
                >
                    <Plus size={20} />
                    Add Employee
                </button>

            </div>

            {/* Statistics */}
            <EmployeeStats employees={filteredEmployees} />

            {/* Search */}
            <EmployeeSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Filters */}
            <EmployeeFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Table */}
            <EmployeeTable
                employees={filteredEmployees}
                loading={loading}
            />

        </div>
    );
};

export default EmployeeList;