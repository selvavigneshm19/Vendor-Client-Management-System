import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTasks } from "../../services/taskService";

import TaskFilters from "../../components/task/TaskFilters";
import TaskSearch from "../../components/task/TaskSearch";
import TaskStats from "../../components/task/TaskStats";
import TaskTable from "../../components/task/TaskTable";

const TaskList = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const data = await getTasks();

            setTasks(data.tasks || []);
            setFilteredTasks(data.tasks || []);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = [...tasks];

        // Search
        if (searchTerm) {
            filtered = filtered.filter((task) => {
                return (
                    task.taskTitle
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    task.employee?.employeeName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    task.project?.projectName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            });
        }

        // Status Filter
        if (statusFilter !== "All") {
            filtered = filtered.filter(
                (task) => task.status === statusFilter
            );
        }

        setFilteredTasks(filtered);
    }, [tasks, searchTerm, statusFilter]);

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Task Management
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage and assign employee tasks.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/dashboard/tasks/add")}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition"
                >
                    <Plus size={20} />
                    Add Task
                </button>

            </div>

            {/* Stats */}

            <TaskStats tasks={tasks} />

            {/* Search */}

            <TaskSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Filters */}

            <TaskFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Table */}

            <TaskTable
                tasks={filteredTasks}
                loading={loading}
                refreshTasks={fetchTasks}
            />

        </div>
    );
};

export default TaskList;