import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Get All Tasks
|--------------------------------------------------------------------------
*/

export const getTasks = async (params = {}) => {
    const response = await api.get("/tasks", {
        params,
    });

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Task By ID
|--------------------------------------------------------------------------
*/

export const getTaskById = async (id) => {
    const response = await api.get(`/tasks/${id}`);

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Task
|--------------------------------------------------------------------------
*/

export const createTask = async (taskData) => {
    const response = await api.post(
        "/tasks",
        taskData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Task
|--------------------------------------------------------------------------
*/

export const updateTask = async (
    id,
    taskData
) => {
    const response = await api.put(
        `/tasks/${id}`,
        taskData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Task
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| Start Task
|--------------------------------------------------------------------------
*/

export const startTask = async (id) => {
    const response = await api.put(`/tasks/${id}/start`);

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Complete Task
|--------------------------------------------------------------------------
*/

export const completeTask = async (id) => {
    const response = await api.put(`/tasks/${id}/complete`);

    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(
        `/tasks/${id}`
    );

    return response.data;
};  