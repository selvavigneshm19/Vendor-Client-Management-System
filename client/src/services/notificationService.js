import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Get All Notifications
|--------------------------------------------------------------------------
*/

export const getNotifications = async () => {
    const response = await api.get("/notifications");
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get My Notifications
|--------------------------------------------------------------------------
*/

export const getMyNotifications = async () => {
    const response = await api.get("/notifications/my");
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Unread Count
|--------------------------------------------------------------------------
*/

export const getUnreadNotificationCount = async () => {
    const response = await api.get("/notifications/unread-count");
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Mark As Read
|--------------------------------------------------------------------------
*/

export const markNotificationAsRead = async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

export const deleteNotification = async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
};