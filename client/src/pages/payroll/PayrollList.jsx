import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPayrolls } from "../../services/payrollService";

import PayrollFilters from "../../components/payroll/PayrollFilters";
import PayrollSearch from "../../components/payroll/PayrollSearch";
import PayrollStats from "../../components/payroll/PayrollStats";
import PayrollTable from "../../components/payroll/PayrollTable";

const PayrollList = () => {
    const navigate = useNavigate();

    const [payrolls, setPayrolls] = useState([]);
    const [filteredPayrolls, setFilteredPayrolls] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            setLoading(true);

            const data = await getPayrolls();

            setPayrolls(data.payrolls || []);
            setFilteredPayrolls(data.payrolls || []);
        } catch (error) {
            console.error("Failed to fetch payrolls", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = [...payrolls];

        // Search
        if (searchTerm) {
            filtered = filtered.filter((payroll) =>
                payroll.employee?.employeeName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        // Status Filter
        if (statusFilter !== "All") {
            filtered = filtered.filter(
                (payroll) =>
                    payroll.paymentStatus === statusFilter
            );
        }

        setFilteredPayrolls(filtered);
    }, [payrolls, searchTerm, statusFilter]);

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Payroll Management
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage employee payroll records.
                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/dashboard/payroll/add")
                    }
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition"
                >
                    <Plus size={20} />
                    Add Payroll
                </button>

            </div>

            {/* Stats */}

            <PayrollStats payrolls={payrolls} />

            {/* Search */}

            <PayrollSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Filters */}

            <PayrollFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Table */}

            <PayrollTable
                payrolls={filteredPayrolls}
                loading={loading}
            />

        </div>
    );
};

export default PayrollList;