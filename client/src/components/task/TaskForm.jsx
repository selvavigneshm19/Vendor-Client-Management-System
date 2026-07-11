import { useEffect, useState } from "react";

import { getEmployees } from "../../services/employeeService";
import { getProjects } from "../../services/projectService";

const TaskForm = ({
    formData,
    setFormData,
    onSubmit,
    loading,
}) => {
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchEmployees();
        fetchProjects();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data.employees || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data.projects || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form
            onSubmit={onSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Task Title */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Task Title *
                    </label>

                    <input
                        type="text"
                        name="taskTitle"
                        value={formData.taskTitle}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />

                </div>

                {/* Project */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Project *
                    </label>

                    <select
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    >

                        <option value="">
                            Select Project
                        </option>

                        {projects.map((project) => (
                            <option
                                key={project._id}
                                value={project._id}
                            >
                                {project.projectName}
                            </option>
                        ))}

                    </select>

                </div>

                {/* Employee */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Employee *
                    </label>

                    <select
                        name="employee"
                        value={formData.employee}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {employees.map((employee) => (
                            <option
                                key={employee._id}
                                value={employee._id}
                            >
                                {employee.employeeName}
                            </option>
                        ))}

                    </select>

                </div>

                {/* Priority */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Priority
                    </label>

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Critical">
                            Critical
                        </option>

                    </select>

                </div>
                {/* Status */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="On Hold">
                            On Hold
                        </option>

                    </select>

                </div>

                {/* Start Date */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Start Date *
                    </label>

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />

                </div>

                {/* Due Date */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Due Date *
                    </label>

                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                        required
                    />

                </div>

                {/* Estimated Hours */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Estimated Hours
                    </label>

                    <input
                        type="number"
                        name="estimatedHours"
                        min="0"
                        step="0.5"
                        value={formData.estimatedHours}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                </div>

                {/* Actual Hours */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Actual Hours
                    </label>

                    <input
                        type="number"
                        name="actualHours"
                        min="0"
                        step="0.5"
                        value={formData.actualHours}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                </div>
                {/* Description */}

                <div className="md:col-span-2">

                    <label className="block text-gray-300 mb-2">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter task description..."
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                </div>

                {/* Remarks */}

                <div className="md:col-span-2">

                    <label className="block text-gray-300 mb-2">
                        Remarks
                    </label>

                    <textarea
                        rows="3"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Additional remarks..."
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-8">

                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-gray-300 hover:bg-slate-800 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : "Save Task"}
                </button>

            </div>

        </form>
    );
};

export default TaskForm;