import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLeaves } from "../../services/leaveService";

import LeaveFilters from "../../components/leave/LeaveFilters";
import LeaveSearch from "../../components/leave/LeaveSearch";
import LeaveStats from "../../components/leave/LeaveStats";
import LeaveTable from "../../components/leave/LeaveTable";

const LeaveList = () => {
    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchLeaves = async () => {
        try {
            setLoading(true);

            const data = await getLeaves();

            setLeaves(data.leaves || []);
            setFilteredLeaves(data.leaves || []);
        } catch (error) {
            console.error("Failed to fetch leaves", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    useEffect(() => {
        let filtered = [...leaves];

        if (searchTerm) {
            filtered = filtered.filter((leave) => {
                return (
                    leave.employee?.employeeName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    leave.employee?.employeeCode
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            });
        }

        if (statusFilter !== "All") {
            filtered = filtered.filter(
                (leave) => leave.status === statusFilter
            );
        }

        setFilteredLeaves(filtered);
    }, [leaves, searchTerm, statusFilter]);

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Leave Management
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage employee leave requests.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/dashboard/leave/add")}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition"
                >
                    <Plus size={20} />
                    Apply Leave
                </button>

            </div>

            <LeaveStats leaves={leaves} />

            <LeaveSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <LeaveFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <LeaveTable
                leaves={filteredLeaves}
                loading={loading}
            />

        </div>
    );
};

export default LeaveList;