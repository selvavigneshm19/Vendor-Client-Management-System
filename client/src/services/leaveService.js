import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Get All Leaves
|--------------------------------------------------------------------------
*/

export const getLeaves = async (params = {}) => {
    const response = await api.get("/leaves", {
        params,
    });

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Leave By ID
|--------------------------------------------------------------------------
*/

export const getLeaveById = async (id) => {
    const response = await api.get(`/leaves/${id}`);

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Leave
|--------------------------------------------------------------------------
*/

export const createLeave = async (leaveData) => {
    const response = await api.post(
        "/leaves",
        leaveData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Leave
|--------------------------------------------------------------------------
*/

export const updateLeave = async (
    id,
    leaveData
) => {
    const response = await api.put(
        `/leaves/${id}`,
        leaveData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Leave
|--------------------------------------------------------------------------
*/

export const deleteLeave = async (id) => {
    const response = await api.delete(
        `/leaves/${id}`
    );

    return response.data;
};