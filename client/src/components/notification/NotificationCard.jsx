import {
    Bell,
    Check,
    Trash2,
} from "lucide-react";

const NotificationCard = ({
    notification,
    onRead,
    onDelete,
}) => {

    const getBadgeColor = () => {

        switch (notification.type) {

            case "Success":
                return "bg-green-600";

            case "Warning":
                return "bg-yellow-500 text-black";

            case "Error":
                return "bg-red-600";

            default:
                return "bg-blue-600";

        }

    };

    return (

        <div
            className={`border rounded-2xl p-5 transition hover:border-violet-500
            ${notification.isRead
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-800 border-violet-500"
                }`}
        >

            {/* Header */}

            <div className="flex justify-between items-start">

                <div className="flex items-center gap-3">

                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${getBadgeColor()}`}
                    >

                        <Bell size={20} />

                    </div>

                    <div>

                        <h3 className="text-white font-semibold">

                            {notification.title}

                        </h3>

                        <span
                            className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${getBadgeColor()}`}
                        >

                            {notification.type}

                        </span>

                    </div>

                </div>

                {!notification.isRead && (

                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                )}

            </div>

            {/* Message */}

            <p className="text-gray-300 mt-5">

                {notification.message}

            </p>

            {/* Footer */}

            <div className="flex justify-between items-center mt-6">

                <span className="text-sm text-gray-500">

                    {new Date(
                        notification.createdAt
                    ).toLocaleString()}

                </span>

                <div className="flex gap-3">

                    {!notification.isRead && (

                        <button
                            onClick={() =>
                                onRead(notification._id)
                            }
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                        >

                            <Check size={16} />

                            Read

                        </button>

                    )}

                    <button
                        onClick={() =>
                            onDelete(notification._id)
                        }
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                    >

                        <Trash2 size={16} />

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default NotificationCard;