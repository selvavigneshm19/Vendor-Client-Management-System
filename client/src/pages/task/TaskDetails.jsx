import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTaskById } from "../../services/taskService";

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const data = await getTaskById(id);
            setTask(data.task);
        } catch (error) {
            console.error(error);
        }
    };

    if (!task) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                Loading Task...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Task Details
                    </h1>

                    <p className="text-gray-400 mt-1">
                        View task information.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/dashboard/tasks")}
                    className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
                >
                    Back
                </button>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <Detail label="Task Title" value={task.taskTitle} />

                    <Detail
                        label="Employee"
                        value={task.employee?.employeeName}
                    />

                    <Detail
                        label="Project"
                        value={task.project?.projectName}
                    />

                    <Detail
                        label="Priority"
                        value={task.priority}
                    />

                    <Detail
                        label="Status"
                        value={task.status}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-slate-800 rounded-xl p-5">
                            <h3 className="text-sm text-gray-400">
                                Estimated Hours
                            </h3>

                            <p className="text-xl text-white font-semibold mt-2">
                                {task.estimatedHours} hrs
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5">
                            <h3 className="text-sm text-gray-400">
                                Actual Hours
                            </h3>

                            <p className="text-xl text-white font-semibold mt-2">
                                {task.actualHours} hrs
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5">
                            <h3 className="text-sm text-gray-400">
                                Started At
                            </h3>

                            <p className="text-white mt-2">
                                {task.startedAt
                                    ? new Date(task.startedAt).toLocaleString()
                                    : "-"}
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5">
                            <h3 className="text-sm text-gray-400">
                                Completed At
                            </h3>

                            <p className="text-white mt-2">
                                {task.completedAt
                                    ? new Date(task.completedAt).toLocaleString()
                                    : "-"}
                            </p>
                        </div>

                    </div>

                    <Detail
                        label="Start Date"
                        value={new Date(task.startDate).toLocaleDateString()}
                    />

                    <Detail
                        label="Due Date"
                        value={new Date(task.dueDate).toLocaleDateString()}
                    />

                    <Detail
                        label="Estimated Hours"
                        value={task.estimatedHours}
                    />

                    <Detail
                        label="Actual Hours"
                        value={task.actualHours}
                    />

                    <Detail
                        label="Created By"
                        value={task.createdBy?.name}
                    />

                    <div className="md:col-span-2">

                        <h3 className="text-gray-400 mb-2">
                            Description
                        </h3>

                        <p className="bg-slate-800 rounded-xl p-4 text-white">
                            {task.description || "-"}
                        </p>

                    </div>

                    <div className="md:col-span-2">

                        <h3 className="text-gray-400 mb-2">
                            Remarks
                        </h3>

                        <p className="bg-slate-800 rounded-xl p-4 text-white">
                            {task.remarks || "-"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

const Detail = ({ label, value }) => (
    <div>
        <h3 className="text-gray-400 mb-2">
            {label}
        </h3>

        <p className="bg-slate-800 rounded-xl p-3 text-white">
            {value || "-"}
        </p>
    </div>
);

export default TaskDetails;