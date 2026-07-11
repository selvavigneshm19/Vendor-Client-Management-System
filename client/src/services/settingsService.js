import api from "../api/axios";

// ======================================
// Get Settings
// ======================================
export const getSettings = async () => {
    const response = await api.get("/settings");
    return response.data;
};

// ======================================
// Create Settings
// ======================================
export const createSettings = async (data) => {
    const response = await api.post("/settings", data);
    return response.data;
};

// ======================================
// Update Settings
// ======================================
export const updateSettings = async (data) => {
    const response = await api.put("/settings", data);
    return response.data;
};