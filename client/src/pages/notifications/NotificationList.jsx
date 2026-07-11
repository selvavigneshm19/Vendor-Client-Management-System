import {
    Bell,
    Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import NotificationCard from "../../components/notification/NotificationCard";

import {
    deleteNotification,
    getNotifications,
    markNotificationAsRead,
} from "../../services/notificationService";

const NotificationList = () => {

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    useEffect(() => {

        fetchNotifications();

    }, []);

    const fetchNotifications = async () => {

        try {

            setLoading(true);

            const response = await getNotifications();

            setNotifications(response.notifications);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            fetchNotifications();

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this notification?")) {
            return;
        }

        try {

            await deleteNotification(id);

            fetchNotifications();

        } catch (error) {

            console.error(error);

        }

    };

    const filteredNotifications = useMemo(() => {

        return notifications.filter((notification) => {

            const matchesSearch =

                notification.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                notification.message
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =

                filter === "All"

                    ? true

                    : filter === "Read"

                        ? notification.isRead

                        : !notification.isRead;

            return matchesSearch && matchesFilter;

        });

    }, [notifications, search, filter]);

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        Notifications

                    </h1>

                    <p className="text-gray-400 mt-1">

                        Manage all system notifications.

                    </p>

                </div>

                <div className="bg-violet-600 rounded-xl px-5 py-3 flex items-center gap-3">

                    <Bell />

                    <div>

                        <p className="text-xs">

                            Total Notifications

                        </p>

                        <h2 className="text-xl font-bold">

                            {notifications.length}

                        </h2>

                    </div>

                </div>

            </div>

            {/* Search + Filter */}

            <div className="flex flex-col md:flex-row gap-4">

                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search notification..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white"
                    />

                </div>

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                >

                    <option>All</option>

                    <option>Read</option>

                    <option>Unread</option>

                </select>

            </div>

            {/* Notifications */}

            {loading ? (

                <div className="bg-slate-900 rounded-2xl p-8 text-center text-gray-400">

                    Loading Notifications...

                </div>

            ) : filteredNotifications.length === 0 ? (

                <div className="bg-slate-900 rounded-2xl p-8 text-center text-gray-400">

                    No Notifications Found

                </div>

            ) : (

                <div className="space-y-5">

                    {filteredNotifications.map((notification) => (

                        <NotificationCard

                            key={notification._id}

                            notification={notification}

                            onRead={handleRead}

                            onDelete={handleDelete}

                        />

                    ))}

                </div>

            )}

        </div>

    );

};

export default NotificationList;