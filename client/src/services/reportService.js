import api from "../api/axios";


/*
|--------------------------------------------------------------------------
| Dashboard Report
|--------------------------------------------------------------------------
*/

export const getDashboardReport = async () => {
    const response = await api.get("/reports/dashboard");

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Employee Report
|--------------------------------------------------------------------------
*/

export const getEmployeeReport = async (params = {}) => {
    const response = await api.get("/reports/employees", {
        params,
    });

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Attendance Report
|--------------------------------------------------------------------------
*/

export const getAttendanceReport = async (params = {}) => {
    const response = await api.get("/reports/attendance", {
        params,
    });

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Leave Report
|--------------------------------------------------------------------------
*/

export const getLeaveReport = async (params = {}) => {
    const response = await api.get("/reports/leaves", {
        params,
    });

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Payroll Report
|--------------------------------------------------------------------------
*/

export const getPayrollReport = async (params = {}) => {
    const response = await api.get("/reports/payroll", {
        params,
    });

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Task Report
|--------------------------------------------------------------------------
*/

export const getTaskReport = async (params = {}) => {
    const response = await api.get("/reports/tasks", {
        params,
    });

    return response.data;
};