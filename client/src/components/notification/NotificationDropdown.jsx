import { Bell, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationDropdown = ({
    notifications = [],
    loading,
    onMarkAsRead,
}) => {

    return (

        <div className="absolute right-0 mt-3 w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">

                <div className="flex items-center gap-2">

                    <Bell
                        size={20}
                        className="text-violet-500"
                    />

                    <h2 className="text-white font-semibold text-lg">
                        Notifications
                    </h2>

                </div>

                <span className="text-xs bg-violet-600 text-white px-2 py-1 rounded-full">
                    {notifications.length}
                </span>

            </div>

            {/* Body */}

            <div className="max-h-96 overflow-y-auto">

                {loading ? (

                    <div className="p-6 text-center text-gray-400">
                        Loading...
                    </div>

                ) : notifications.length === 0 ? (

                    <div className="p-8 text-center text-gray-400">

                        <Bell
                            size={40}
                            className="mx-auto mb-3"
                        />

                        No Notifications

                    </div>

                ) : (

                    notifications.slice(0, 5).map((notification) => (

                        <div
                            key={notification._id}
                            className={`border-b border-slate-800 p-4 hover:bg-slate-800 transition ${notification.isRead
                                    ? ""
                                    : "bg-slate-800/40"
                                }`}
                        >

                            <div className="flex justify-between items-start">

                                <div className="flex-1">

                                    <h3 className="text-white font-medium">
                                        {notification.title}
                                    </h3>

                                    <p className="text-sm text-gray-400 mt-1">
                                        {notification.message}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(
                                            notification.createdAt
                                        ).toLocaleString()}
                                    </p>

                                </div>

                                {!notification.isRead && (

                                    <button
                                        onClick={() =>
                                            onMarkAsRead(notification._id)
                                        }
                                        className="ml-3 text-green-400 hover:text-green-300"
                                        title="Mark as Read"
                                    >
                                        <CheckCircle2 size={18} />
                                    </button>

                                )}

                            </div>

                        </div>

                    ))

                )}

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800">

                <Link
                    to="/dashboard/notifications"
                    className="block w-full text-center py-4 text-violet-400 hover:bg-slate-800 transition font-medium"
                >
                    View All Notifications
                </Link>

            </div>

        </div>

    );

};

export default NotificationDropdown;