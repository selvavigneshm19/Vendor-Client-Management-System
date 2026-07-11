import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAttendance } from "../../services/attendanceService";

import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceSearch from "../../components/attendance/AttendanceSearch";
import AttendanceStats from "../../components/attendance/AttendanceStats";
import AttendanceTable from "../../components/attendance/AttendanceTable";

const AttendanceList = () => {
    const navigate = useNavigate();

    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchAttendance = async () => {
        try {
            setLoading(true);

            const data = await getAttendance();

            setAttendance(data.attendance || []);
            setFilteredAttendance(data.attendance || []);
        } catch (error) {
            console.error("Failed to fetch attendance", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    useEffect(() => {
        let filtered = [...attendance];

        if (searchTerm) {
            filtered = filtered.filter((item) => {
                return (
                    item.employee?.employeeName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.employee?.employeeCode
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            });
        }

        if (statusFilter !== "All") {
            filtered = filtered.filter(
                (item) => item.status === statusFilter
            );
        }

        setFilteredAttendance(filtered);
    }, [attendance, searchTerm, statusFilter]);

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Attendance Management
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage employee attendance records.
                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/dashboard/attendance/add")
                    }
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition"
                >
                    <Plus size={20} />
                    Mark Attendance
                </button>

            </div>

            <AttendanceStats attendance={attendance} />

            <AttendanceSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <AttendanceFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <AttendanceTable
                attendance={filteredAttendance}
                loading={loading}
            />

        </div>
    );
};

export default AttendanceList;