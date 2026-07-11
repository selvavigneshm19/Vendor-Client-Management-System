import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const getAdminStats = async () => {
    const response = await api.get("/admins/stats");

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get All Admins
|--------------------------------------------------------------------------
*/

export const getAdmins = async () => {
    const response = await api.get("/admins");

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Admin By ID
|--------------------------------------------------------------------------
*/

export const getAdminById = async (id) => {
    const response = await api.get(`/admins/${id}`);

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Admin
|--------------------------------------------------------------------------
*/

export const createAdmin = async (adminData) => {
    const response = await api.post(
        "/admins",
        adminData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Admin
|--------------------------------------------------------------------------
*/

export const updateAdmin = async (
    id,
    adminData
) => {
    const response = await api.put(
        `/admins/${id}`,
        adminData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Admin
|--------------------------------------------------------------------------
*/

export const deleteAdmin = async (id) => {
    const response = await api.delete(
        `/admins/${id}`
    );

    return response.data;
};