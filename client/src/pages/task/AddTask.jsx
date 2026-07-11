import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TaskForm from "../../components/task/TaskForm";
import { createTask } from "../../services/taskService";

const AddTask = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createTask(formData);

            alert("Task created successfully");

            navigate("/dashboard/tasks");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create task"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Create Task
                </h1>

                <p className="text-gray-400 mt-1">
                    Assign a new task to an employee.
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

export default AddTask;