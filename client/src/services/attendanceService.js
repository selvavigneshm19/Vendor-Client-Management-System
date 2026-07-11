import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Get All Attendance
|--------------------------------------------------------------------------
*/

export const getAttendance = async (params = {}) => {
    const response = await api.get("/attendance", {
        params,
    });

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Attendance By ID
|--------------------------------------------------------------------------
*/

export const getAttendanceById = async (id) => {
    const response = await api.get(`/attendance/${id}`);

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Attendance
|--------------------------------------------------------------------------
*/

export const createAttendance = async (attendanceData) => {
    const response = await api.post(
        "/attendance",
        attendanceData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Attendance
|--------------------------------------------------------------------------
*/

export const updateAttendance = async (
    id,
    attendanceData
) => {
    const response = await api.put(
        `/attendance/${id}`,
        attendanceData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Attendance
|--------------------------------------------------------------------------
*/

export const deleteAttendance = async (id) => {
    const response = await api.delete(
        `/attendance/${id}`
    );

    return response.data;
};