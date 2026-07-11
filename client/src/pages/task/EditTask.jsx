import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TaskForm from "../../components/task/TaskForm";

import {
    getTaskById,
    updateTask,
} from "../../services/taskService";

const EditTask = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        taskTitle: "",
        description: "",
        employee: "",
        project: "",
        priority: "Medium",
        status: "Pending",
        startDate: "",
        dueDate: "",
        estimatedHours: "",
        actualHours: "",
        remarks: "",
    });

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const data = await getTaskById(id);

            const task = data.task;

            setFormData({
                taskTitle: task.taskTitle || "",
                description: task.description || "",
                employee: task.employee?._id || "",
                project: task.project?._id || "",
                priority: task.priority || "Medium",
                status: task.status || "Pending",
                startDate: task.startDate
                    ? task.startDate.substring(0, 10)
                    : "",
                dueDate: task.dueDate
                    ? task.dueDate.substring(0, 10)
                    : "",
                estimatedHours: task.estimatedHours || "",
                actualHours: task.actualHours || "",
                remarks: task.remarks || "",
            });

        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await updateTask(id, formData);

            alert("Task updated successfully");

            navigate("/dashboard/tasks");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update task"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Edit Task
                </h1>

                <p className="text-gray-400 mt-1">
                    Update task information.
                </p>

            </div>

            <TaskForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
            />

        </div>
    );
};

export default EditTask;