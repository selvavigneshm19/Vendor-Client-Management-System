const ReportFilters = ({
    filters,
    setFilters,
    employees = [],
    departments = [],
    projects = [],
}) => {

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

                {/* Employee */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Employee
                    </label>

                    <select
                        name="employee"
                        value={filters.employee}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >

                        <option value="">
                            All Employees
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

                {/* Department */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Department
                    </label>

                    <select
                        name="department"
                        value={filters.department}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >

                        <option value="">
                            All Departments
                        </option>

                        {departments.map((department) => (

                            <option
                                key={department}
                                value={department}
                            >
                                {department}
                            </option>

                        ))}

                    </select>

                </div>

                {/* Project */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Project
                    </label>

                    <select
                        name="project"
                        value={filters.project}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >

                        <option value="">
                            All Projects
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

                {/* Status */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        Status
                    </label>

                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Approved">
                            Approved
                        </option>

                        <option value="Rejected">
                            Rejected
                        </option>

                        <option value="Present">
                            Present
                        </option>

                        <option value="Absent">
                            Absent
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>

                </div>

                {/* From Date */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        From
                    </label>

                    <input
                        type="date"
                        name="fromDate"
                        value={filters.fromDate}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                </div>

                {/* To Date */}

                <div>

                    <label className="block text-gray-300 mb-2">
                        To
                    </label>

                    <input
                        type="date"
                        name="toDate"
                        value={filters.toDate}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                </div>

            </div>

        </div>

    );

};

export default ReportFilters;