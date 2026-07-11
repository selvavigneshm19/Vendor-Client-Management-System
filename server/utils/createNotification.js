const Notification = require("../models/Notification");

const createNotification = async ({
    title,
    message,
    type = "Info",
    recipient,
    createdBy,
}) => {
    try {
        await Notification.create({
            title,
            message,
            type,
            recipient,
            createdBy,
        });
    } catch (error) {
        console.error("Notification Error:", error);
    }
};

module.exports = createNotification;