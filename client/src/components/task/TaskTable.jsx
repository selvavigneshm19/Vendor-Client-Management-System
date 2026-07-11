import {
    CheckCircle,
    Eye,
    Pencil,
    Play,
    Trash2,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    completeTask,
    deleteTask,
    startTask,
} from "../../services/taskService";

import DeleteTaskModal from "./DeleteTaskModal";

const TaskTable = ({
    tasks,
    loading,
    refreshTasks,
}) => {
    const navigate = useNavigate();

    const [openDelete, setOpenDelete] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // ==========================
    // Start Task
    // ==========================

    const handleStart = async (id) => {
        try {
            await startTask(id);

            alert("Task started successfully");

            refreshTasks();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to start task"
            );
        }
    };

    // ==========================
    // Complete Task
    // ==========================

    const handleComplete = async (id) => {
        try {
            await completeTask(id);

            alert("Task completed successfully");

            refreshTasks();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to complete task"
            );
        }
    };

    // ==========================
    // Delete Task
    // ==========================

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);

            await deleteTask(selectedTask._id);

            alert("Task deleted successfully");

            setOpenDelete(false);
            setSelectedTask(null);

            refreshTasks();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                Loading Tasks...
            </div>
        );
    }

    return (
        <>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-800">

                        <tr>

                            <th className="text-left p-4 text-gray-300">
                                Task
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Employee
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Project
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Priority
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Due Date
                            </th>

                            <th className="text-left p-4 text-gray-300">
                                Status
                            </th>

                            <th className="text-center p-4 text-gray-300">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {tasks.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Tasks Found
                                </td>

                            </tr>

                        ) : (

                            tasks.map((task) => (

                                <tr
                                    key={task._id}
                                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                                >

                                    <td className="p-4 text-white">
                                        {task.taskTitle}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {task.employee?.employeeName}
                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {task.project?.projectName}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === "Critical"
                                                    ? "bg-red-600 text-white"
                                                    : task.priority === "High"
                                                        ? "bg-orange-500 text-white"
                                                        : task.priority === "Medium"
                                                            ? "bg-yellow-500 text-black"
                                                            : "bg-green-600 text-white"
                                                }`}
                                        >
                                            {task.priority}
                                        </span>

                                    </td>

                                    <td className="p-4 text-gray-300">
                                        {new Date(
                                            task.dueDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${task.status === "Completed"
                                                    ? "bg-green-600 text-white"
                                                    : task.status === "Pending"
                                                        ? "bg-yellow-500 text-black"
                                                        : task.status === "In Progress"
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-600 text-white"
                                                }`}
                                        >
                                            {task.status}
                                        </span>

                                    </td>
                                    <td className="p-4">

                                        <div className="flex justify-center gap-2 flex-wrap">

                                            {/* View */}

                                            <button
                                                onClick={() =>
                                                    navigate(`/dashboard/tasks/${task._id}`)
                                                }
                                                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
                                                title="View Task"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Edit */}

                                            <button
                                                onClick={() =>
                                                    navigate(`/dashboard/tasks/edit/${task._id}`)
                                                }
                                                className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition"
                                                title="Edit Task"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            {/* Start Task */}

                                            {task.status === "Pending" && (

                                                <button
                                                    onClick={() =>
                                                        handleStart(task._id)
                                                    }
                                                    className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition"
                                                    title="Start Task"
                                                >
                                                    <Play size={18} />
                                                </button>

                                            )}

                                            {/* Complete Task */}

                                            {task.status === "In Progress" && (

                                                <button
                                                    onClick={() =>
                                                        handleComplete(task._id)
                                                    }
                                                    className="p-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition"
                                                    title="Complete Task"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>

                                            )}

                                            {/* Delete */}

                                            <button
                                                onClick={() => {
                                                    setSelectedTask(task);
                                                    setOpenDelete(true);
                                                }}
                                                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                                                title="Delete Task"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>
            <DeleteTaskModal
                open={openDelete}
                task={selectedTask}
                loading={deleteLoading}
                onClose={() => {
                    setOpenDelete(false);
                    setSelectedTask(null);
                }}
                onDelete={handleDelete}
            />

        </>
    );
};

export default TaskTable;